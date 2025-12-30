const axios = require('axios');
module.exports = {
      command: "meme",
      description: "picks a random meme",
      category: "tools",
execute: async (sock, m ) => {
    try {
        // Fetch memes from the Imgflip API
        const response = await axios.get('https://api.imgflip.com/get_memes');
        
        if (response.data.success) {
            const memes = response.data.data.memes;

            // Pick a random meme from the list
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];

            // Send the meme image to the chat
            await sock.sendMessage(m.chat, { image: { url: randomMeme.url }, caption: randomMeme.name });
        } else {
            await sock.sendMessage(m.chat, { text: 'Failed to fetch memes. Please try again later.' });
        }
    } catch (error) {
        console.error('Error fetching meme:', error);
        await sock.sendMessage(m.chat, { text: 'An error occurred while fetching a meme.' });
    }
} 
      };
