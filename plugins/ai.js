const axios = require('axios');

module.exports = {
    command: "andy",
    description: "ask ai",
    category: "ai",
    execute: async (sock, m, { reply, isCreator }) => {
    try {
        if (!q) return reply("Please provide a message for the Ai.\nExample: `.andy what is going on`");
             await sock.sendMessage(m.chat, { 
                react: { text: "📡", key: m.key } 
            });

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            return reply("Andy failed to respond. Please try again later.");
        }

        await reply(`🤖 *Andy Response:*\n\n${data.message}`);
    } catch (e) {
        console.error("Error in AI command:", e);
        reply("An error occurred while communicating with the AI.");
    }
}};