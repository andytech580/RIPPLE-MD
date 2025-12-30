const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

module.exports = {
    command: "vv",
    description: "Reveal view-once images, videos, or audio",
    category: "tools",
    execute: async (sock, m, { reply }) => {
        try {
            let mediaMessage;

            // Check main message
            const mainViewOnce = m.message?.viewOnceMessage?.message;
            if (mainViewOnce) {
                mediaMessage =
                    mainViewOnce.imageMessage ||
                    mainViewOnce.videoMessage ||
                    mainViewOnce.audioMessage;
            } else {
                // Check quoted message
                const quoted =
                    m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

                if (quoted?.viewOnceMessage?.message) {
                    mediaMessage =
                        quoted.viewOnceMessage.message.imageMessage ||
                        quoted.viewOnceMessage.message.videoMessage ||
                        quoted.viewOnceMessage.message.audioMessage;
                } else if (quoted) {
                    mediaMessage =
                        quoted.imageMessage ||
                        quoted.videoMessage ||
                        quoted.audioMessage;
                }
            }
            
            if (!mediaMessage) {
                return reply("❌ Reply to a view-once image, video, or audio.");
            }
               await sock.sendMessage(m.chat, { 
                react: { text: "☠️", key: m.key } 
            });
            const mime = mediaMessage.mimetype;
            if (!mime) return reply("❌ Unable to detect media type.");

            if (mime.startsWith("image/")) {
                return await handleImage(sock, m.chat, mediaMessage);
            }

            if (mime.startsWith("video/")) {
                return await handleVideo(sock, m.chat, mediaMessage);
            }

            if (mime.startsWith("audio/")) {
                return await handleAudio(sock, m.chat, mediaMessage);
            }

            reply("❌ Unsupported media type.");

        } catch (err) {
            console.error("ViewOnce Error:", err);
            reply("❌ Failed to process view-once media.");
        }
    }
};

async function handleImage(sock, chatId, mediaMessage) {
    const stream = await downloadContentFromMessage(mediaMessage, 'image');
    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    await sock.sendMessage(chatId, { image: buffer });
}

async function handleVideo(sock, chatId, mediaMessage) {
    const tempDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const filePath = path.join(tempDir, `viewonce_${Date.now()}.mp4`);
    const stream = await downloadContentFromMessage(mediaMessage, 'video');
    const write = fs.createWriteStream(filePath);

    for await (const chunk of stream) {
        write.write(chunk);
    }
    write.end();

    await new Promise(r => write.on("finish", r));

    await sock.sendMessage(chatId, {
        video: fs.readFileSync(filePath)
    });

    fs.unlinkSync(filePath);
}

async function handleAudio(sock, chatId, mediaMessage) {
    const stream = await downloadContentFromMessage(mediaMessage, 'audio');
    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    await sock.sendMessage(chatId, {
        audio: buffer,
        mimetype: mediaMessage.mimetype
    });
}