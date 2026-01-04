import type { VercelRequest, VercelResponse } from '@vercel/node';

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
      console.error('Missing Twitch credentials');
      return res.status(500).json({ online: false, error: 'Missing credentials' });
    }

    const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error('Failed to get Twitch access token', tokenData);
      return res.status(500).json({ online: false, error: 'Auth failed' });
    }

    const streamRes = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${username}`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const streamData = await streamRes.json();

    if (streamData.error) {
      console.error('Twitch API Error:', streamData);
      return res.status(streamRes.status).json({ online: false, error: streamData.message });
    }

    return res.status(200).json({
      online: streamData.data && streamData.data.length > 0,
    });
  } catch (error) {
    console.error('Twitch status handler error:', error);
    return res.status(500).json({ online: false });
  }
}
