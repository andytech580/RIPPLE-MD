const fs = require('fs');
const path = require('path');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

module.exports = {
    command: "setpp",
    description: "Set bot profile picture",
    category: "owner",
    execute: async (sock, m, { reply, isCreator }) => {
        try {
            // Owner check
            if (!isCreator) {
                return reply("❌ This command is only available for the owner!");
            }

            // Get quoted message
            const quoted =
                m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

            if (!quoted) {
                return reply("⚠️ Reply to an image with .setpp");
            }

            // Image or sticker support
            const imageMessage =
                quoted.imageMessage || quoted.stickerMessage;

            if (!imageMessage) {
                return reply("❌ The replied message must contain an image!");
            }

            // Create temp folder
            const tmpDir = path.join(process.cwd(), "tmp");
            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir, { recursive: true });
            }

            // Download image
            const stream = await downloadContentFromMessage(imageMessage, "image");
            let buffer = Buffer.from([]);

            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            const imagePath = path.join(tmpDir, `profile_${Date.now()}.jpg`);
            fs.writeFileSync(imagePath, buffer);

            // Update profile picture
            await sock.updateProfilePicture(sock.user.id, {
                url: imagePath
            });

            // Cleanup
            fs.unlinkSync(imagePath);

            reply("✅ Bot profile picture updated!");

        } catch (err) {
            console.error("SetPP Error:", err);
            reply("❌ Failed to update profile picture.");
        }
    }
};