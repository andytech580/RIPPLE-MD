const axios = require('axios');
module.exports = {
  command: "xstalk",
  description: "Get details about a Twitter/X user.",
  category: "search",
execute: async (sock, m, { quoted, q, reply }) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid Twitter/X username.");
    }

    await sock.sendMessage(m.chat, {
      react: { text: "⏳", key: m.key }
    });

    const apiUrl = `https://delirius-apiofc.vercel.app/tools/xstalk?username=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return reply("⚠️ Failed to fetch Twitter/X user details. Ensure the username is correct.");
    }

    const user = data.data;
    const verifiedBadge = user.verified ? "✅" : "❌";

    const caption = `╭━〔 *NEBULA ASSASSIN X STALKER* 〕━━━⊷\n`
      + ` ├─∘❏👤 *Name:* ${user.name}\n`
      + ` ├─∘❏🔹 *Username:* @${user.username}\n`
      + ` ├─∘❏✔️ *Verified:* ${verifiedBadge}\n`
      + ` ├─∘❏👥 *Followers:* ${user.followers_count}\n`
      + ` ├─∘❏👤 *Following:* ${user.following_count}\n`
      + ` ├─∘❏📝 *Tweets:* ${user.tweets_count}\n`
      + ` ├─∘❏📅 *Joined:* ${user.created}\n`
      + ` ├─∘❏🔗 *Profile:* [Click Here](${user.url})\n`
      + ` ╰━━━⪼\n\n`
      + `🔹 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ Andy*`;

    await sock.sendMessage(m.chat, {
      image: { url: user.avatar },
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
}
  };
