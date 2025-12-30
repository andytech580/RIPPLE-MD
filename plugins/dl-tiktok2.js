const axios = require("axios");
module.exports = {
    command: "tt2",
    description: "Download TikTok video without watermark",
    category: "downloader",
execute: async (sock, m, { reply, args, q }) => {
    try {
        // Validate input
        const url = q || m.quoted?.text;
        if (!url || !url.includes("tiktok.com")) {
            return reply("❌ Please provide/reply to a TikTok link");
        }

        // Show processing reaction
        await sock.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        // Fetch video from BK9 API
        const { data } = await axios.get(`https://bk9.fun/download/tiktok2?url=${encodeURIComponent(url)}`);
        
        if (!data?.status || !data.BK9?.video?.noWatermark) {
            throw new Error("No video found in API response");
        }

        // Send video with minimal caption
        await sock.sendMessage(m.chat, {
            video: { url: data.BK9.video.noWatermark },
            caption: `- *Cʀᴇᴀᴛᴇᴅ ʙʏ andy 💜*`
        }, { quoted: m });

        // Success reaction
        await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('TT2 Error:', error);
        reply("❌ Download failed. Invalid link or API error try other TikTok command");
        await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
   };