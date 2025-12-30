module.exports = {
  command: "readmore",
  description: "Generate a Read More message with hidden text",
  category: "tools",
execute: async (sock, m, { reply, args }) => {
  try {
    if (!args[0]) return reply("❌ Please provide text!\nExample: .readmore Hello world");

    const inputText = args.join(" ");
    const readMoreGap = String.fromCharCode(8206).repeat(4001); // Creates hidden gap
    const message = `${inputText}${readMoreGap}`; // No "Continue Reading" text needed

    await sock.sendMessage(m.chat, { text: message }, { quoted: m });
    
  } catch (error) {
    console.error("Readmore Error:", error);
    reply("❌ Failed to create readmore message. Please try again.");
  }
}
  };
