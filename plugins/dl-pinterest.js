const axios = require("axios");
module.exports = {
    command: "pinterest",
    description: "Download media from Pinterest",
    category: "downloader",
execute: async (sock, m, { args, reply }) => {
    try {
        // ⏳ React: Processing Start
        await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

        // Validate input
        if (args.length < 1) {
            await sock.sendMessage(m.chat, { react: { text: "⚠️", key: m.key } });
            return reply('❎ Please provide a Pinterest URL.');
        }

        const pinterestUrl = args[0];
        const response = await axios.get(`https://delirius-apiofc.vercel.app/download/pinterestdl?url=${encodeURIComponent(pinterestUrl)}`);

        if (!response.data.status || !response.data.data) {
            await sock.sendMessage(m.chat, { react: { text: "❌", key: mek.key } });
            return reply('❎ Failed to fetch data from Pinterest.');
        }

        const data = response.data.data;
        const title = data.title || "No title available";
        const description = data.description || "No description available";
        const mediaType = data.download?.type || "unknown";
        const mediaUrl = data.download?.url;
        const thumb = data.thumbnail;

        const caption = `> *Cʀᴇᴀᴛᴇᴅ ʙʏ Andy tech *`;

        if (mediaType === "video" && mediaUrl) {
            await sock.sendMessage(m.chat, { video: { url: mediaUrl }, caption }, { quoted: m });
        } else if (mediaType === "image" && mediaUrl) {
            await sock.sendMessage(m.chat, { image: { url: mediaUrl }, caption }, { quoted: m });
        } else {
            await sock.sendMessage(m.chat, { image: { url: thumb }, caption }, { quoted: mek });
        }

        // ✅ React: Completed
        await sock.sendMessage(m.chat, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        console.error(e);
        await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        reply('❎ An error occurred while processing your request.');
    }
}
    };
