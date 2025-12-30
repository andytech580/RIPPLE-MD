const config = require("../settings/config");
const fs = require("fs");
const path = require("path");
module.exports = {
    command: "ban",
    description: "Ban a user from using the bot",
    category: "owner",
execute: async (sock, m, { args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗Only the bot owner can use this command!_");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("❌ Please provide a number or tag/reply a user.");

        let banned = JSON.parse(fs.readFileSync("./assets/ban.json", "utf-8"));

        if (banned.includes(target)) {
            return reply("❌ This user is already banned.");
        }

        banned.push(target);
        fs.writeFileSync("./assets/ban.json", JSON.stringify([...new Set(banned)], null, 2));

        await conn.sendMessage(from, {
            image: { url: config.thumbUrl },
            caption: `⛔ User has been banned from using the bot.`
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
}
    };