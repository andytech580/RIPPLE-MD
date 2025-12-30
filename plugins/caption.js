

  module.exports = {
    command: "caption",
    description: "Add or change caption of replied media",
    category: "tools",
execute: async (sock, m, {quoted, reply, text }) => {
    try {
      if (!m.quoted) {
        return reply(
          "*❗ Please reply to a media message*\n\n" +
          "*Usage:*\n" +
          "• Reply to media with `.caption your text`"
        );
      }


      if (!quoted.download) {
        return reply("❌ The replied message is not downloadable media.");
      }

      const buffer = await quoted.download();
      if (!buffer) {
        return reply("❌ Failed to download media.");
      }

      const caption = text || "";

      let messageContent = {
        caption,
        mimetype: quoted.mimetype
      };

      switch (quoted.mtype) {
        case "imageMessage":
          messageContent.image = buffer;
          messageContent.mimetype ||= "image/jpeg";
          break;

        case "videoMessage":
          messageContent.video = buffer;
          messageContent.mimetype ||= "video/mp4";
          break;

        case "documentMessage":
          messageContent.document = buffer;
          messageContent.mimetype ||= "application/octet-stream";
          break;

        case "audioMessage":
          messageContent.audio = buffer;
          messageContent.mimetype ||= "audio/mp4";
          messageContent.ptt = quoted.ptt || false;
          break;

        default:
          return reply(
            "❌ Supported types:\n" +
            "• Image\n• Video\n• Document\n• Audio"
          );
      }

      await sock.sendMessage(m.chat, messageContent, { quoted: m });

    } catch (err) {
      console.error("Caption Command Error:", err);
      reply("❌ Error while adding caption.");
    }
  }
};
