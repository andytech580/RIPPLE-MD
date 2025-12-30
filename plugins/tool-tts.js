const axios = require('axios');
const googleTTS = require('google-tts-api');

module.exports = {
    command: "tts",
    description: "download songs",
    category: "downloader",
execute: async(sock, m,{ reply }) => {
try{
if(!q) return reply("Need some text.")
    const url = googleTTS.getAudioUrl(q, {
  lang: 'hi-IN',
  slow: false,
  host: 'https://translate.google.com',
})
await sock.sendMessage(m.chat, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
    }catch(a){
reply(`${a}`)
}
} };
