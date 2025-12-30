const axios = require('axios');

module.exports = {
    command: "getpp",
    description: "Get profile picture of a user",
    category: "owner",
    execute: async (sock, m, { reply }) => {
        try {
            // Owner check
            if (!m.key.fromMe) {
                return reply("❌ This command is only available for the owner!");
            }

            let userToAnalyze;

            // Check for mentioned users
            if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
                userToAnalyze = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
            } 
            // Check for replied message
            else if (m.message?.extendedTextMessage?.contextInfo?.participant) {
                userToAnalyze = m.message.extendedTextMessage.contextInfo.participant;
            }

            if (!userToAnalyze) {
                return reply("⚠️ Please mention someone or reply to their message to get their profile picture!\n\nMaximum usage 5");
            }

            // Try to get profile picture
            let profilePic;
            try {
                profilePic = await sock.profilePictureUrl(userToAnalyze, "image");
            } catch {
                profilePic = "https://files.catbox.moe/lvcwnf.jpg"; // fallback image
            }

            // Send profile picture
            await sock.sendMessage(m.chat, {
                image: { url: profilePic },
                caption: `Profile picture of @${userToAnalyze.split('@')[0]}`,
                mentions: [userToAnalyze]
            });

        } catch (err) {
            console.error("GetPP Error:", err);
            reply("❌ Failed to retrieve profile picture. The user might not have one set.");
        }
    }
};