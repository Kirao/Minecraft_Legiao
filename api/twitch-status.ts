export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return new Response(
        JSON.stringify({ error: 'username é obrigatório' }),
        { status: 400 }
      );
    }

    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ error: 'Credenciais da Twitch não configuradas' }),
        { status: 500 }
      );
    }

    // 1️⃣ Token OAuth
    const tokenRes = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      { method: 'POST' }
    );

    const tokenData = await tokenRes.json();

    // 2️⃣ Consulta live
    const streamRes = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${username.toLowerCase()}`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const streamData = await streamRes.json();

    return new Response(
      JSON.stringify({
        online: streamData.data?.length > 0,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('TWITCH API ERROR:', error);

    return new Response(
      JSON.stringify({ error: 'Erro interno Twitch API' }),
      { status: 500 }
    );
  }
}
