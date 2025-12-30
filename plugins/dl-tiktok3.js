const axios =require("axios");

module.exports = {
  command: "tt3",
  react: "📥",
  desc: "Download TikTok video (API v4)",
  category: "downloader",
execute: async (sock, m, { reply, args }) => {
  try {
    const url = args[0];
    if (!url || !url.includes("tiktok.com")) {
      return reply("❌ Please provide a valid TikTok video URL.\n\nExample:\n.tt4 https://vt.tiktok.com/...");
    }

    await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    const apiUrl = `https://jawad-tech.vercel.app/download/tiktok?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.result || !data.result.length) {
      return reply("❌ Video not found or unavailable.");
    }

    const video = data.result[0]; // First available video link
    const meta = data.metadata || {};
    const author = meta.author || "Unknown";
    const caption = meta.caption ? meta.caption.slice(0, 300) + "..." : "No caption provided.";

    await sock.sendMessage(m.chat, {
      video: { url: video },
      caption: `🎬 *TikTok Downloader*\n👤 *Author:* ${author}\n💬 *Caption:* ${caption}\n\n> Cʀᴇᴀᴛᴇᴅ ʙʏ andy 💜`
    }, { quoted: mek });

    await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

  } catch (err) {
    console.error("TT4 Error:", err);
    reply("❌ Failed to download TikTok video. Please try again later.");
    await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
  }
}
   };
            
            