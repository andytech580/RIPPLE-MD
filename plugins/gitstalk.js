const axios = require('axios');

module.exports = {
    command: "githubstalk",
    description: "Fetch detailed GitHub user profile including profile picture.",
    category: "search",
execute: async (sock, m, { args, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }
        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `👤 *Username*: ${data.name || data.login}
🔗 *Github Url*:(${data.html_url})
📝 *Bio*: ${data.bio || 'Not available'}
🏙️ *Location*: ${data.location || 'Unknown'}
📊 *Public Repos*: ${data.public_repos}
👥 *Followers*: ${data.followers} | Following: ${data.following}
📅 *Created At*: ${new Date(data.created_at).toDateString()}
🔭 *Public Gists*: ${data.public_gists}
> © ᴘᴘᴏᴡᴇʀᴇᴅ ʙʏ andy`;
          const sentMsg = await sock.sendMessage(m.chat,{image:{url: data.avatar_url },caption: userInfo },{quoted:m })
    } catch (e) {
        console.log(e);
        reply(`error: ${e.response ? e.response.data.message : e.message}`);
    }
}
 };

