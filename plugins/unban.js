const config = require("../settings/config");
const fs = require("fs");
const path = require("path");
module.exports = {
    command: "unban",
    description: "Unban a user",
    category: "owner",
execute: async (sock, m, { args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗Only the bot owner can use this command!_");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("❌ Please provide a number or tag/reply a user.");

        let banned = JSON.parse(fs.readFileSync("./assets/ban.json", "utf-8"));

        if (!banned.includes(target)) {
            return reply("❌ This user is not banned.");
        }

        const updated = banned.filter(u => u !== target);
        fs.writeFileSync("./assets/ban.json", JSON.stringify(updated, null, 2));

        await sock.sendMessage(m.chat, {
            image: { url: config.thumbUrl },
            caption: `✅ User has been unbanned.`
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
}
  };