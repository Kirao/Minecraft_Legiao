import type { VercelRequest, VercelResponse } from '@vercel/node';

const STREAM_CACHE_TTL = 60 * 1000; // 60s
const TOKEN_CACHE_TTL = 60 * 60 * 1000; // 1h

let cachedToken: {
  accessToken: string;
  expiresAt: number;
} | null = null;

const streamCache = new Map<
  string,
  { online: boolean; expires: number }
>();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const username = req.query.username as string;

  if (!username) {
    return res.status(400).json({ online: false });
  }

  try {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res
        .status(500)
        .json({ error: 'Credenciais da Twitch não configuradas' });
    }

    // 🔹 CACHE DO STATUS
    const cached = streamCache.get(username);
    if (cached && cached.expires > Date.now()) {
      return res.status(200).json({
        online: cached.online,
        cached: true,
      });
    }

    // 🔹 CACHE DO TOKEN
    if (!cachedToken || cachedToken.expiresAt < Date.now()) {
      const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      });

      const tokenData = await tokenRes.json();

      cachedToken = {
        accessToken: tokenData.access_token,
        expiresAt: Date.now() + TOKEN_CACHE_TTL,
      };
    }

    // 🔹 CHAMADA À TWITCH
    const streamRes = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${username}`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${cachedToken.accessToken}`,
        },
      }
    );

    const streamData = await streamRes.json();
    const online = streamData.data?.length > 0;

    // 🔹 SALVA CACHE
    streamCache.set(username, {
      online,
      expires: Date.now() + STREAM_CACHE_TTL,
    });

    return res.status(200).json({
      online,
      cached: false,
    });
  } catch (error) {
    console.error('Erro Twitch:', error);
    return res.status(500).json({ online: false });
  }
}
