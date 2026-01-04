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
    const url = `https://www.youtube.com/${cleanHandle}/live`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      }
    });

    const html = await response.text();

    // A detecção de live no YouTube sem API é complexa porque o HTML contém muitos estados.
    // "isLive":true aparece até em lives que já acabaram ou estão agendadas.
    // O sinal mais forte de uma live REALMENTE acontecendo agora é a presença de "status":"LIVE" 
    // dentro do objeto de visualização ou o texto "watching" / "assistindo agora".
    
    const isLiveNow = html.includes('{"status":"LIVE"}') || 
                      html.includes('{"label":"LIVE"}') ||
                      html.includes('{"label":"AO VIVO"}') ||
                      (html.includes('isLive":true') && html.includes('viewCountText'));

    // Se a página contiver "Scheduled for" ou "Agendado para", não está online ainda.
    const isScheduled = html.includes('Scheduled for') || html.includes('Agendado para');
    
    // Se contiver "Streamed" ou "Transmitido há", é uma live que já acabou.
    const isFinished = html.includes('Streamed live') || html.includes('Transmitido ao vivo');

    const finalStatus = isLiveNow && !isScheduled && !isFinished;

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');

    return res.status(200).json({
      online: !!finalStatus,
    });
  } catch (error) {
    console.error('YouTube status error:', error);
    return res.status(500).json({ online: false });
  }
}
