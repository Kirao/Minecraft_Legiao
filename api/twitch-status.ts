import type { VercelRequest, VercelResponse } from '@vercel/node';

// Cache simples em memória (dura enquanto a função lambda estiver quente)
const cache: Record<string, { online: boolean, timestamp: number }> = {};
const CACHE_DURATION = 60 * 1000; // 1 minuto

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const username = req.query.username as string;

  if (!username) {
    return res.status(400).json({ online: false });
  }

  // Verifica cache
  const now = Date.now();
  if (cache[username] && (now - cache[username].timestamp < CACHE_DURATION)) {
    return res.status(200).json({ online: cache[username].online, cached: true });
  }

  try {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ online: false, error: 'Missing credentials' });
    }

    // 1. Obter Token
    const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return res.status(500).json({ online: false, error: 'Auth failed' });
    }

    // 2. Verificar Stream
    const streamRes = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${username}`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    if (streamRes.status === 404) {
      return res.status(200).json({ online: false, error: 'User not found' });
    }

    const streamData = await streamRes.json();
    const isOnline = !!(streamData.data && streamData.data.length > 0);

    // Salva no cache
    cache[username] = { online: isOnline, timestamp: now };

    // Cache na borda da Vercel (Edge Cache)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    return res.status(200).json({
      online: isOnline,
    });
  } catch (error) {
    console.error('Twitch status error:', error);
    // Se der erro, tenta retornar o que tem no cache mesmo que expirado
    if (cache[username]) {
      return res.status(200).json({ online: cache[username].online, error: 'Using expired cache' });
    }
    return res.status(500).json({ online: false });
  }
}
