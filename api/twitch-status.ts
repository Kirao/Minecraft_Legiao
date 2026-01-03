const streamData = await streamRes.json();

console.log('STREAM DATA:', JSON.stringify(streamData, null, 2));

return res.status(200).json({
  online: streamData.data?.length > 0,
  raw: streamData, // 👈 DEBUG
});
