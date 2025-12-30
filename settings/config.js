// 漏 2025 𝙰𝙽𝙳𝚈. All Rights Reserved.
// respect the work, don’t just copy-paste.

const fs = require('fs')

const config = {
    owner: "ANDY",
    botNumber: "",
    Dev:"+256701583113",
    setPair: "K0MRAID1",
    thumbUrl: "https://files.catbox.moe/nnrub7.jpg",
    session: "sessions",

    status: {
        public: true,
        terminal: true,
        reactsw: false
    },

    message: {
        owner: "no, this is for owners only",
        group: "this is for groups only",
        admin: "this command is for admin only",
        private: "this is specifically for private chat"
    },

    mess: {
        owner: 'This command is only for the bot owner!',
        done: 'Mode changed successfully!',
        error: 'Something went wrong!',
        wait: 'Please wait...'
    },

    settings: {
        title: "𝚁𝙸𝙿𝙿𝙻𝙴 𝚂𝚃𝙴𝙼 𝙻𝙰𝙱𝚂",
        packname: '𝚁𝙸𝙿𝙿𝙻𝙴 𝙼𝙳',
        description: "𝙱𝙾𝚃 𝙲𝚁𝙴𝙰𝚃𝙴𝙳 𝙱𝚈 𝙰𝙽𝙳𝚈-𝚃𝙴𝙲𝙷",
        author: '𝙰𝙽𝙳𝚈 𝚃𝙴𝙲𝙷',
        footer: "> *𝔓𝔒𝔚𝔈ℜ𝔈𝔇 𝔅𝔜 𝔄𝔑𝔇𝔜-𝔗𝔈ℭℌ*",

        // auto features
        wapresence: false,
        autoStatusView: true,
        autoStatusReact: true,
        autoTyping: true,
        autoRecording: false
    },

    newsletter: {
        name: "𝙰 𝚆𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚁𝙸𝙿𝙿𝙻𝙴",
        id: "120363404529319592@newsletter"
    },

    api: {
        baseurl: "https://hector-api.vercel.app/",
        apikey: "hector"
    },

    sticker: {
        packname: "𝚁𝙸𝙿𝙿𝙻𝙴 𝙼𝙳",
        author: "𝚁𝙸𝙿𝙿𝙻𝙴 𝚂𝚃𝙴𝙼 𝙻𝙰𝙱𝚂"
    }
}

module.exports = config

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m')
    delete require.cache[file]
    require(file)
})