const axios = require('axios');

module.exports = {
    command: "pickupline",
    description: "Get a random pickup line",
    category: "fun",
execute: async (sock, m, { reply }) => {
    try {
        const { data } = await axios.get('https://apis.davidcyriltech.my.id/pickupline');
        
        if (!data.success) return reply("❌ Failed to get a pickup line. Try again!");
        
        await reply(`💝 *Pickup Line* 💝\n\n"${data.pickupline}"\n\n_Use wisely!_`);
        
    } catch (error) {
        console.error('Pickup Error:', error);
        reply("❌ My charm isn't working right now. Try again later!");
    }
}
    };
