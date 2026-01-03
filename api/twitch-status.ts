import type { VercelRequest, VercelResponse } from '@vercel/node';

const CACHE_TTL = 60; // segundos (recomendado 60–120)
const cache = new Map<
  string,
  { online: boolean; expires: number }
>();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { username } = req.query;

  if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Credenciais da Twitch não configuradas' });
  }

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'username obrigatório' });
  }

  // 🔹 CACHE CHECK
  const cached = cache.get(username);
  if (cached && cached.expires > Date.now()) {
    return res.status(200).json({
      online: cached.online,
      cached: true,
    });
  }

  // 🔹 CHAMADA REAL À TWITCH
  const response = await fetch(
    `https://api.twitch.tv/helix/streams?user_login=${username}`,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  const online = data.data && data.data.length > 0;

  // 🔹 SALVA NO CACHE
  cache.set(username, {
    online,
    expires: Date.now() + CACHE_TTL * 1000,
  });

  return res.status(200).json({
    online,
    cached: false,
  });
}
