const config = require("../settings/config");
module.exports={
  command: "aura",
  description: "Calculate aura score of a user.",
  category: "fun",
execute: async (sock, m, { args, reply }) => {
  try {
    if (args.length < 1) {
      return reply("Please mention a user to calculate their aura.\nUsage: `.aura @user`");
    }

    let user = m.mentionedJid[0]; 
    const specialNumber = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;

    // Calculate a random aura score (between 1 to 1000)
    let auraScore = Math.floor(Math.random() * 1000) + 1;

    // Check if the mentioned user is the special number
    if (user === specialNumber) {
      auraScore = 999999; // Special case for DEV number
      return reply(`💀 Aura of @${user.split('@')[0]}: ${auraScore}+ 🗿`);
    }

    // Send the aura message
    await sock.sendMessage(m.chat, {
      text: `💀 Aura of @${user.split('@')[0]}: ${auraScore}/1000 🗿`,
      mentions: [user],
    }, { quoted: m });

  } catch (error) {
    console.log(error);
    reply(`❌ Error: ${error.message}`);
  }
}
   };