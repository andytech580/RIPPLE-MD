const axios = require('axios');
module.exports = {
    command: "nglimg",
    desc: "Generate an NGL-style image using custom text",
    category: "downloader",
execute: async (sock, m, { reply, text }) => {
    try {
        if (!text) return reply('❌ Please provide some text to generate NGL image.\nExample: !nglimg Andy the programmer');

        const encodedText = encodeURIComponent(text.trim());
        const apiUrl = `https://jawad-tech.vercel.app/random/ngl?text=${encodedText}`;

        // Check if the API returns a valid image
        try {
            const headCheck = await axios.head(apiUrl);
            if (!headCheck.headers['content-type']?.startsWith('image/')) {
                return reply('❌ Failed to generate image. API did not return an image.');
            }
        } catch (e) {
            return reply('❌ Could not reach the NGL API. Please try again later.');
        }

        // Send the image
        await sock.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `- ✨ ᴘᴏᴡᴇʀᴇᴅ ʙʏ andy*`
        }, { quoted: m });

    } catch (err) {
        console.error('NGL Image Error:', err);
        reply('❌ Something went wrong while generating image.\nError: ' + err.message);
    }
}
};
