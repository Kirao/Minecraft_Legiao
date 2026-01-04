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
    // Usamos a URL principal do canal para verificar se há o sinal de "LIVE" no avatar ou no banner
    const url = `https://www.youtube.com/${cleanHandle}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      }
    });

    const html = await response.text();

    // A prova cabal de que alguém está online no YouTube sem API é procurar por:
    // 1. "style":"LIVE" (dentro do JSON de badges)
    // 2. "iconType":"LIVE"
    // 3. Presença de um link que contenha "/watch?v=" E a palavra "LIVE" ou "AO VIVO" por perto.
    
    // O KronosPlaying provavelmente aparece online porque ele tem uma live agendada que o YouTube coloca em destaque.
    // Vamos procurar especificamente por indicadores de que a live está TRANSMITINDO AGORA.
    
    const hasLiveBadge = html.includes('"label":"LIVE"') || html.includes('"label":"AO VIVO"');
    const isStreaming = html.includes('{"style":"LIVE"}') || html.includes('iconType":"LIVE"');
    
    // Verificação de segurança: Se o canal tiver "Upcoming" ou "Agendado" com muita força, ignoramos.
    const isUpcoming = html.includes('Upcoming') || html.includes('Agendado para');

    // Se tiver a badge de LIVE e NÃO for agendado, as chances de estar online são de 99%
    const isOnline = (hasLiveBadge || isStreaming) && !isUpcoming;

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    return res.status(200).json({
      online: !!isOnline,
    });
  } catch (error) {
    console.error('YouTube status error:', error);
    return res.status(500).json({ online: false });
  }
}
