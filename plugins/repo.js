const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const config = require('../settings/config');

module.exports={
    command: "repo",
    description: "Fetch information about this GitHub repository.",
    category: "main",
execute:async (sock, m, { reply }) => {
    const githubRepoURL = 'https://github.com/Andytech580/RIPPLE-MD';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

        const data = await res.json();

        const caption = `
╭━━〔 🔎 *𝙍𝙄𝙋𝙋𝙇𝙀-𝙈𝘿 𝙍𝙀𝙋𝙊* 〕━━⬣
┃ 📦 *Bot Name:* ${data.name}
┃ 👑 *Owner:* ${data.owner.login}
┃ ⭐ *Stars:* ${data.stargazers_count}
┃ 🍴 *Forks:* ${data.forks_count}
┃ 🔗 *Link:* ${data.html_url}
┃ 📝 *Description:* ${data.description || 'No description'}
╰━━━━━━━━━━━━━━━━━━━━⬣
✨ *Don't forget to ★ and fork!*
🔧 𝘼𝙡𝙡 𝙘𝙧𝙚𝙙𝙞𝙩𝙨 𝙩𝙤 𝘼𝙣𝙙𝙮-𝙩𝙚𝙘𝙝
        `.trim();

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402507750390@newsletter',
                newsletterName: '𝘼𝙣𝙙𝙮-𝙩𝙚𝙘𝙝',
                serverMessageId: 143
            }
        };

        await sock.sendMessage(m.chat, {
            image: { url: config.thumbUrl },
            caption,
            contextInfo
        }, { quoted: m }); 

    } catch (error) {
        console.error("Repo Command Error:", error);
        reply("❌ *Failed to fetch repository info.*\nPlease try again later.");
    }
}
};
