
const axios = require("axios");

module.exports = {
  command: "epl",
  description: "English premier league",
  category:"search",
execute: async (sock, m, ) => {
  try {
    // Show processing reaction
    await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    let apiUrl;
    let response;
    let resultText = "";

      apiUrl = "https://apis-keith.vercel.app/epl/standings";
      response = await axios.get(apiUrl);

      const { competition, standings } = response.data.result;
      resultText = `🏆 *${competition} - Standings* 🏆\n\n`;
      standings.forEach((team) => {
        resultText += `*${team.position}.* ${team.team}\n`;
        resultText += `📊 *Played:* ${team.played} | *Won:* ${team.won} | *Draw:* ${team.draw} | *Lost:* ${team.lost}\n`;
        resultText += `⚽ *GF:* ${team.goalsFor} | *GA:* ${team.goalsAgainst} | *GD:* ${team.goalDifference}\n`;
        resultText += `📈 *Points:* ${team.points}\n\n`;
      });
    // Send the formatted text
    await sock.sendMessage(m.chat, { text: resultText,
  }, { quoted: m});
    await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (error) {
    console.error("EPL command error:", error);
    await sock.sendMessage(
      m.chat,
      { text: "❌ Unable to fetch EPL data. Please try again later." },
      { quoted: m }
    );
    await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
  }
}
};
