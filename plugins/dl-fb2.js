const axios = require("axios");
module.exports = {
  command: "fb2",
  description: "Download videos from Facebook (Basic API)",
  category: "downloader",
execute: async (sock, m, { reply, args }) => {
  try {
    const fbUrl = args[0];
    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply('Please provide a valid Facebook video URL. Example: `.fb https://facebook.com/...`');
    }

    await sock.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://apis.davidcyriltech.my.id/facebook?url=${encodeURIComponent(fbUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.status || !response.data.result || !response.data.result.downloads) {
      return reply('❌ Unable to fetch the video. Please check the URL and try again.');
    }

    const { title, downloads } = response.data.result;
    const downloadLink = downloads.hd?.url || downloads.sd.url;
    const quality = downloads.hd ? "HD" : "SD";

    await reply('Downloading video... Please wait.📥');

    await conn.sendMessage(from, {
      video: { url: downloadLink },
      caption: `> Powered By Andy 💜`
    }, { quoted: mek });

    await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error:', error);
    reply('❌ Unable to download the video. Please try again later or use .fb.');
    await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
} 
     };