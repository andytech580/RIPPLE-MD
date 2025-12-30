const config = require("../settings/config");
const os = require("os");

function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
}

module.exports = {
    command: 'ripple',
    description: 'introduction about ripple stem labs',
    category: 'general',
    execute: async (sock, m, {
        args,
        text,
        q,
        quoted,
        mime,
        qmsg,
        isMedia,
        groupMetadata,
        groupName,
        participants,
        groupOwner,
        groupAdmins,
        isBotAdmins,
        isAdmins,
        isGroupOwner,
        isCreator,
        prefix,
        reply,
        config: cmdConfig,
        sender
    }) => {
        try {
            // Royal crown reaction
            await sock.sendMessage(m.chat, { 
                react: { text: "👑", key: m.key } 
            });

            const userName = m.pushName || "Noble User";
            const botUptime = runtime(process.uptime());
            const totalMemory = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
            const usedMemory = (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2);
            const host = os.platform();
            const ping = Date.now() - m.messageTimestamp * 1000;

            const aliveMessage = 
`✨ *${config.settings.title} is Watching Over You* ✨

╔═══════════════════
║  🏰 *𝚁𝙸𝙿𝙿𝙻𝙴 𝚂𝚃𝙰𝚃𝚄𝚂*
╠═══════════════════
║ ♕ *User:* ${userName}
║ ⏳ *Uptime:* ${botUptime}
║ 💾 *Memory:* ${usedMemory}MB / ${totalMemory}GB
║ ⚡ *Speed:* ${ping}ms
║ 🖥️ *Platform:* ${host}
║ 📜 *Creator:* ${config.owner}
╚═══════════════════

*𝗥𝗜𝗣𝗣𝗟𝗘 𝗔𝗜 𝗔𝗦𝗦𝗜𝗦𝗧𝗔𝗡𝗧*
> 𝐀𝐁𝐎𝐔𝐓 𝐑𝐈𝐏𝐏𝐋𝐄.
 ᴡᴇ ᴛᴇᴀᴄʜ ʀᴏʙᴏᴛɪᴄs ,ᴡᴇʙsɪᴛᴇ ᴅᴇᴠᴇʟᴏᴘᴍᴇɴᴛ ᴀɴᴅ ᴍᴀɴʏ ᴍᴏʀᴇ. 
> *BOARD MEMBERS*
 *AHWEERA AMERIA*
 *AMUTUHAIRE FAITH*
 *TUMUHAISE ANDREW*
ᴄᴜʀʀᴇɴᴛʟʏ ᴡᴇ ʜᴏʟᴅ ʟᴇssᴏɴs ᴀᴛ ᴜɴɪᴠᴇʀsɪᴛʏ ɪɴɴ ᴍʙᴀʀᴀʀᴀ.
ᴡᴇ ᴛʀᴀɪɴ ᴏᴜʀ ʟᴇᴀʀɴᴇʀs ᴡɪᴛʜ ʜᴀɴᴅs ᴏɴ ᴘʀᴏᴊᴇᴄᴛs ᴀɴᴅ ɪɴ-ᴅᴇᴘᴛʜ ᴇxᴘʟᴀɴᴀᴛɪᴏɴs
> *sᴇʀᴠɪᴄᴇs ᴏғғᴇʀᴇᴅ* 
*ᴀʀᴅᴜɪɴᴏ ʀᴏʙᴏᴛɪᴄs*
*ᴡᴇʙ ᴅᴇᴠᴇʟᴏᴘᴍᴇɴᴛ*
*ᴀʀᴅᴜɪɴᴏ ᴘʀᴏɢʀᴀᴍᴍɪɴɢ*
*ᴘʀᴏᴊᴇᴄᴛ ᴘʀᴏᴛᴏᴛʏᴘᴇ ʙᴜɪʟᴅɪɴɢ*
*ᴛᴜᴛᴏʀs ɪɴ sᴄʜᴏᴏʟs*
> ᴛɪᴍᴇ ᴛᴀʙʟᴇ 
ᴡᴇ ᴛᴇᴀᴄʜ ᴛʜʀɪᴄᴇ ᴀ ᴡᴇᴇᴋ ᴛʜᴀᴛ ɪs 
ᴍᴏɴᴅᴀʏ,ᴡᴇᴅɴᴇsᴅᴀʏ ᴀɴᴅ ғʀɪᴅᴀʏ.ᴏᴜʀ ʟᴇssᴏɴs sᴛᴀʀᴛ ᴀᴛ ᴇxᴀᴄᴛʟʏ 9ᴀᴍ ᴀɴᴅ ᴀᴅᴊᴏᴜʀɴ ᴀᴛ 1ᴘᴍ ᴇᴀᴛ.
> ᴘʀɪᴄᴇs(ᴜɢx) 
 *ᴀʀᴅᴜɪɴᴏ ʀᴏʙᴏᴛɪᴄs ᴀɴᴅ ᴘʀᴏɢʀᴀᴍᴍɪɴɢ =>150ᴋ*
 *ᴡᴇʙ ᴅᴇsɪɢɴɪɴɢ ᴀɴᴅ ʜᴏsᴛɪɴɢ => 150ᴋ*
 *ᴄʀᴇᴀᴛɪɴɢ ᴡᴇʙsɪᴛᴇs ᴀɴᴅ ᴘᴇʀsᴏɴᴀʟ ᴘᴏʀᴛɪғᴏʟɪᴏs:ᴄᴏᴍɪɴɢ sᴏᴏɴ...*
 *ᴛᴜᴛᴏʀɪɴɢ ɪɴ sᴄʜᴏᴏʟs:ɴ/ᴀ*
> *sᴛᴇᴍ ʟᴇᴀʀɴɪɴɢ ᴛʜᴀᴛ ʀᴇsᴏɴᴀᴛᴇs*
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ༒ʀɪᴘᴘʟᴇ sᴛᴇᴍ ʟᴀʙs ᴀɪ༒*`;

            await sock.sendMessage(m.chat, {
                image: { url: config.thumbUrl },
                caption: aliveMessage,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: `👑 ${config.settings.title} - 𝐑𝐢𝐩𝐩𝐥𝐞 𝐛𝐨𝐭`,
                        body: config.settings.description,
                        thumbnailUrl: config.thumbUrl,
                        sourceUrl: "https://whatsapp.com/channel/0029VbBhe8lCRs1fCxZ9OM3U",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });

            // Success reaction
            await sock.sendMessage(m.chat, { 
                react: { text: "✨", key: m.key } 
            });

        } catch (error) {
            console.error("Error in alive command:", error);
            await sock.sendMessage(m.chat, { 
                react: { text: "💔", key: m.key } 
            });
            await reply("❌ The royal scroll couldn't be delivered. Please try again.");
        }
    }
};