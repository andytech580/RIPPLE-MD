const axios = require('axios');

module.exports = {
    command: "getimage",
    description: "Convert image URL to WhatsApp image",
    category: "tools",
execute: async (sock, m, { reply, text }) => {
    try {
        if (!text) return reply('Please provide an image URL\nExample: !getimage https://example.com/image.jpg');

        const imageUrl = text.trim();

        // Validate URL
        if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
            return reply('❌ Invalid image URL! Must be direct link to image (jpg/png/gif/webp)');
        }

        // Verify the image exists
        try {
            const response = await axios.head(imageUrl);
            if (!response.headers['content-type']?.startsWith('image/')) {
                return reply('❌ URL does not point to a valid image');
            }
        } catch (e) {
            return reply('❌ Could not access image URL. Please check the link');
        }

        // Send the image
        await sock.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: '> ᴘᴏᴡᴇʀᴇᴅ ʙʏ andy '
        }, { quoted: mek });

    } catch (error) {
        console.error('GetImage Error:', error);
        reply('❌ Failed to process image. Error: ' + error.message);
    }
}
    };
