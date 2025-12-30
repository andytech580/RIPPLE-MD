

module.exports = {
    command: "technologia",
    description: "Send the Technologia meme audio",
    category: "ai",

execute: async (sock, m, { reply }) => {
    try {
        await sock.sendMessage(m.chat, {
            audio: { url: "https://files.catbox.moe/fac856.mp3" },
            mimetype: "audio/mpeg",
            ptt: false
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        reply("*❌ Technologia Failed!*\n_Blyat! Error: " + e.message + "_");
    }
} };
