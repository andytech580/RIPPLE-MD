const axios = require("axios");

module.exports = {
    command: "playstore",
    description: "Search for an app on the Play Store",
    category: "search",
execute: async (sock, m, { q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide an app name to search.");

        // React: Processing ⏳
        await sock.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        const apiUrl = `https://apis.davidcyriltech.my.id/search/playstore?q=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.success || !response.data.result) {
            await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            return reply("❌ No results found for the given app name.");
        }

        const app = response.data.result;

        const infoMessage = `
📲 *NEBULA ASSASSIN PLAY STORE SEARCH*
╭──────────────◆
│• 📌 Name: ${app.title}
│• 📖 Summary: ${app.summary}
│• 📥 Installs: ${app.installs}
│• ⭐ Rating: ${app.score}
│• 💲 Price: ${app.price}
│• 📦 Size: ${app.size || 'Not available'}
│• 📱 Android: ${app.androidVersion}
│• 👨‍💻 Developer: ${app.developer}
│• 📅 Released: ${app.released}
│• 🔄 Updated: ${app.updated}
│• 🔗 Link: ${app.url}
╰─────────────────
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ Andy🤍*`.trim();

        if (app.icon) {
            await sock.sendMessage(
                m.chat,
                {
                    image: { url: app.icon },
                    caption: infoMessage
                },
                { quoted: m }
            );
        } else {
            await reply(infoMessage);
        }

        // React: Success ✅
        await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error("Play Store Error:", error);
        await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        reply("❌ Error searching for the app. Please try again.");
    }
}
    };
