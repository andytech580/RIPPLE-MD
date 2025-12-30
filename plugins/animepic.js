
const axios = require("axios");


  module.exports = {
    command: "animepic",
    description: "Get a random anime picture",
    category: "fun",
 execute: async (sock, m, { reply }) => {
    try {
      // Using Nekos API for anime images
      const res = await axios.get("https://nekos.life/api/v2/img/neko");
      const imgUrl = res.data.url;

      await sock.sendMessage(
        m.chat,
        {
          image: { url: imgUrl },
          caption: `🎌 *𝐇𝐞𝐫𝐞'𝐬 𝐲𝐨𝐮𝐫 𝐫𝐚𝐧𝐝𝐨𝐦 𝐚𝐧𝐢𝐦𝐞 𝐩𝐢𝐜*  
⚡ 𝐩𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐀𝐧𝐝𝐲 𝐓𝐞𝐜𝐡✟`,
        },
        { quoted: m }
      );
    } catch (e) {
      console.error(e);
      reply("❌ Failed to fetch anime picture. Try again later.");
    }
  }
};