const axios = require('axios');

module.exports={
    command: "shayari",
    description: "Get a random romantic shayari",
    category: "fun",
execute:async (sock, m, { reply }) => {
    try {
        const apiUrl = 'https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo';
        
        const { data } = await axios.get(apiUrl);
        
        if (!data.result) {
            return reply("❌ Shayari dil mein nahi aayi, phir try karo!");
        }
        
        const shayariMessage = `${data.result}`.trim();

        await reply(shayariMessage);
        
    } catch (error) {
        console.error('Shayari Error:', error);
        reply("❌ Aaj dil mein shayari nahi hai... Kal try karna!");
    }
}
   };
