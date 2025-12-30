const config = require("../settings/config");
const { fetchJson } = require('../library/functions');
const { translate } = require('@vitalets/google-translate-api');
const axios = require('axios');
module.exports = {
  command: "quran",
  description: "Get Quran Surah details and explanation.",
  category: "religion",
 execute: async (sock,  m, { args, reply }) => {
  try {
    let surahInput = args[0];

    if (!surahInput) {
      return reply('Type Surah Number or Type *.Surahmenu* for getting Surah numbers');
    }

    let surahListRes = await fetchJson('https://quran-endpoint.vercel.app/quran');
    let surahList = surahListRes.data;

    let surahData = surahList.find(surah => 
        surah.number === Number(surahInput) || 
        surah.asma.ar.short.toLowerCase() === surahInput.toLowerCase() || 
        surah.asma.en.short.toLowerCase() === surahInput.toLowerCase()
    );

    if (!surahData) {
      return reply(`Couldn't find surah with number or name "${surahInput}"`);
    }

    let res = await axios.get(`https://quran-endpoint.vercel.app/quran/${surahData.number}`);
    
    if (res.status !== 200) {
      return reply(`API request failed with status ${res.status} and message ${res.statusText}`);
    }

    let json = res.data;

    let translatedTafsirUrdu = await translate(json.data.tafsir.id, { to: 'ur', autoCorrect: true });
    let translatedTafsirEnglish = await translate(json.data.tafsir.id, { to: 'en', autoCorrect: true });

   let quranSurah = `
╭───『 *QURAN: THE HOLY BOOK* 』───❏
│
├─❏ *📖 SURAH INFO*
│  ├─∘ *Number:* ${json.data.number}
│  ├─∘ *Arabic:* ${json.data.asma.ar.long}
│  ├─∘ *English:* ${json.data.asma.en.long}
│  ├─∘ *Type:* ${json.data.type.en}
│  └─∘ *Verses:* ${json.data.ayahCount}
│
├─❏ *🔮 EXPLANATION (URDU)*
│  └─∘ ${translatedTafsirUrdu.text}
│
├─❏ *🔮 EXPLANATION (ENGLISH)*
│  └─∘ ${translatedTafsirEnglish.text}
╰───❏`.trim();

    await sock.sendMessage(
      m.chat,
      {
        image: { url: config.thumbUrl },
        caption: quranSurah,
        contextInfo: {
          mentionedJid: [m.sender], 
          forwardingScore: 999,  
          isForwarded: true,   
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363422794059664@newsletter', 
            newsletterName: 'andy', 
            serverMessageId: 143
          }
        }
      },
      { quoted: m }
    );

    if (json.data.recitation.full) {
      await sock.sendMessage(m.chat, {
        audio: { url: json.data.recitation.full },
        mimetype: 'audio/mpeg',  
        ptt: true
      }, { quoted: m });
    }

  } catch (error) {
    console.error(error);
    reply(`Error: ${error.message}`);
  }
}
   };

