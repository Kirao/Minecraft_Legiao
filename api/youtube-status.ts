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
    // Limpa o handle
    const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
    
    // O YouTube redireciona /@handle/live para a transmissão ao vivo se ela existir.
    // Se não houver live, ele redireciona para a página inicial do canal ou mostra que está offline.
    const url = `https://www.youtube.com/${cleanHandle}/live`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    const html = await response.text();

    // Verificamos se no HTML existe a marcação de que a live está acontecendo.
    // O YouTube insere "isLive":true ou "liveStreamability" no JSON de configuração da página.
    const isOnline = html.includes('{"isLive":true}') || 
                     html.includes('liveStreamabilityRenderer') ||
                     (html.includes('hqdefault_live.jpg') && !html.includes('OFFLINE'));

    // Adicionamos um cache curto para não sobrecarregar e ser rápido
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    return res.status(200).json({
      online: isOnline,
    });
  } catch (error) {
    console.error('YouTube status error:', error);
    return res.status(500).json({ online: false });
  }
}
