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
    const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
    const url = `https://www.youtube.com/${cleanHandle}/live?t=${Date.now()}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      }
    });

    const html = await response.text();

    // Lógica ultra-rigorosa:
    // O YouTube só é considerado ONLINE se:
    // 1. Tiver a marcação de "isLive":true
    // 2. Tiver o status "LIVE" ou "AO VIVO"
    // 3. NÃO for uma estreia (Premiere)
    // 4. NÃO for agendado (Upcoming)
    // 5. Tiver um contador de espectadores ativo (viewCountText)
    
    const isLiveSignal = html.includes('"isLive":true') || html.includes('"style":"LIVE"');
    const hasViewCount = html.includes('viewCountText') || html.includes('watchingNow');
    
    const isUpcoming = html.includes('Upcoming') || html.includes('Agendado') || html.includes('"style":"UPCOMING"');
    const isPremiere = html.includes('Premiere') || html.includes('Estreia');
    const isFinished = html.includes('Streamed live') || html.includes('Transmitido ao vivo') || html.includes('"style":"FINISHED"');

    const isOnline = isLiveSignal && hasViewCount && !isUpcoming && !isPremiere && !isFinished;

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');

    return res.status(200).json({
      online: !!isOnline,
    });
  } catch (error) {
    console.error('YouTube status error:', error);
    return res.status(500).json({ online: false });
  }
}
