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
    // Adicionamos um timestamp aleatório para evitar cache agressivo do navegador/Vercel
    const url = `https://www.youtube.com/${cleanHandle}/live?t=${Date.now()}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    const html = await response.text();

    // Nova lógica mais rigorosa:
    // 1. Verifica se existe o player de live ativo
    const hasLivePlayer = html.includes('yt-player-status-view-model') || html.includes('isLiveNow":true');
    
    // 2. Verifica se o texto "AO VIVO" ou "LIVE" aparece em botões de status reais
    const hasLiveBadge = html.includes('"label":"AO VIVO"') || html.includes('"label":"LIVE"');
    
    // 3. Filtros de exclusão (se tiver isso, NÃO está online)
    const isScheduled = html.includes('Scheduled for') || html.includes('Agendado para') || html.includes('{"style":"UPCOMING"}');
    const isFinished = html.includes('Streamed live') || html.includes('Transmitido ao vivo') || html.includes('{"style":"FINISHED"}');

    // Só está online se tiver o player/badge e NÃO for agendado ou finalizado
    const isOnline = (hasLivePlayer || hasLiveBadge) && !isScheduled && !isFinished;

    // Cache de apenas 30 segundos na Vercel para não dar status "preso"
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');

    return res.status(200).json({
      online: !!isOnline,
    });
  } catch (error) {
    console.error('YouTube status error:', error);
    return res.status(500).json({ online: false });
  }
}
