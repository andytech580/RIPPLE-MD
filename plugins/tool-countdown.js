const sleep = require("../library/function");
module.exports = {
    command: "count",
    description: "Start a countdown from 1 to the specified number.",
    category: "owner",
execute: async (sock, m, { isCreator, args, reply, }) => {
    try {
        // Get the bot owner's number dynamically from isCreator
        if (!isCreator) {
            return reply("❎ Only the bot owner can use this command.");
        }

        // Ensure arguments are provided
        if (!args[0]) {
            return reply("✳️ Use this command like:\n *Example:* .count 10");
        }

        const count = parseInt(args[0].trim());

        // Validate the input
        if (isNaN(count) || count <= 0 || count > 50) {
            return reply("❎ Please specify a valid number between 1 and 50.");
        }

        reply(`⏳ Starting countdown to ${count}...`);

        for (let i = 1; i <= count; i++) {
            await sock.sendMessage(m.chat, { text: `${i}` }, { quoted: m });
            const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
            await sleep(1000); // 1-second delay between messages
        }

        reply(`✅ Countdown completed.`);
    } catch (e) {
        console.error(e);
        reply("❎ An error occurred while processing your request.");
    }
}
  };