import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const handle = req.query.handle as string;

  if (!handle) {
    return res.status(400).json({ online: false });
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      console.error('Missing YouTube API Key');
      return res.status(500).json({ online: false, error: 'Missing API Key' });
    }

    // 1. Buscar o ID do canal pelo handle
    // O handle geralmente começa com @, mas a API pode precisar dele sem o @ ou via search
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${handle}&key=${apiKey}`
    );
    const searchData = await searchRes.json();

    if (!searchData.items || searchData.items.length === 0) {
      return res.status(404).json({ online: false, error: 'Channel not found' });
    }

    const channelId = searchData.items[0].id.channelId;

    // 2. Verificar se há uma live ativa para esse channelId
    const liveRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`
    );
    const liveData = await liveRes.json();

    return res.status(200).json({
      online: liveData.items && liveData.items.length > 0,
    });
  } catch (error) {
    console.error('YouTube status handler error:', error);
    return res.status(500).json({ online: false });
  }
}
