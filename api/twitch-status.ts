import type { VercelRequest, VercelResponse } from '@vercel/node';

let accessToken: string | null = null;

async function getAccessToken() {
  if (accessToken) return accessToken;

  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' }
  );

  const data = await res.json();
  accessToken = data.access_token;
  return accessToken;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'username obrigatório' });
  }

  const token = await getAccessToken();

  const twitchRes = await fetch(
    `https://api.twitch.tv/helix/streams?user_login=${username}`,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID!,
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  const data = await twitchRes.json();

  res.status(200).json({
    online: data.data && data.data.length > 0,
  });
}
