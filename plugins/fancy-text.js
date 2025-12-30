const axios = require("axios");

module.exports={
  command: "fancy",
  description: "Convert text into various fonts.",
  category: "tools",
execute: async (sock, m, { quoted, args, q, reply }) => {
  try {
    if (!q) {
      return reply("❎ Please provide text to convert into fancy fonts.\n\n*Example:* .fancy Hello");
    }

    const apiUrl = `https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);
    
    if (!response.data.status) {
      return reply("❌ Error fetching fonts. Please try again later.");
    }

    const fonts = response.data.result.map(item => `*${item.name}:*\n${item.result}`).join("\n\n");
    const resultText = `✨ *Fancy Fonts Converter* ✨\n\n${fonts}\n\n> *Cʀᴇᴀᴛᴇᴅ ʙʏ Andy*`;

    await sock.sendMessage(m.chat, { text: resultText }, { quoted: m });
  } catch (error) {
    console.error("❌ Error in fancy command:", error);
    reply("⚠️ An error occurred while fetching fonts.");
  }
}
};