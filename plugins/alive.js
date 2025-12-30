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
    command: 'alive',
    description: 'Check system status and bot info',
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
            // Tech reaction
            await sock.sendMessage(m.chat, { 
                react: { text: "⚡", key: m.key } 
            });

            const userName = m.pushName || "User";
            const botUptime = runtime(process.uptime());
            const totalMemory = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
            const usedMemory = (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2);
            const ping = Date.now() - m.messageTimestamp * 1000;
            const platform = os.platform();
            const arch = os.arch();
            const cpu = os.cpus()[0].model;

            const aliveMessage = 
`🤖 *${config.settings.title} - SYSTEM STATUS*

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
👤 **𝚄𝚂𝙴𝚁**: ${userName}
⏱️ **𝚄𝙿𝚃𝙸𝙼𝙴**: ${botUptime}
💾 **𝙼𝙴𝙼𝙾𝚁𝚈**: ${usedMemory}MB / ${totalMemory}GB
📶 **𝙿𝙸𝙽𝙶**: ${ping}ms
🖥️ **𝙿𝙻𝙰𝚃𝙵𝙾𝚁𝙼**: ${platform} ${arch}
⚙️ **𝙲𝙿𝚄**: ${cpu.split(' ')[0]}...

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
🔧 **DEVELOPER**: ${config.owner}
📁 **REPOSITORY**: https://github.com/andytech580/RIPPLE-ME
💬 **DESCRIPTION**: ${config.settings.description}

🔗 **𝙾𝙵𝙵𝙸𝙲𝙸𝙰𝙻 𝙲𝙷𝙰𝙽𝙽𝙴𝙻**:
https://whatsapp.com/channel/0029VbBhe8lCRs1fCxZ9OM3U

${config.settings.footer}`;

            await sock.sendMessage(m.chat, {
                image: { url: config.thumbUrl },
                caption: aliveMessage,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: `🤖 ${config.settings.title}`,
                        body: "System Online & Operational",
                        thumbnailUrl: config.thumbUrl,
                        sourceUrl: "https://www.github.com/OfficilKango",
                        mediaType: 1
                    }
                }
            }, { quoted: m });

            // Technical success reaction
            await sock.sendMessage(m.chat, { 
                react: { text: "✅", key: m.key } 
            });

        } catch (error) {
            console.error("Error in alive command:", error);
            await sock.sendMessage(m.chat, { 
                react: { text: "❌", key: m.key } 
            });
            await reply("🚨 System diagnostic failed. Please try the command again.");
        }
    }
};