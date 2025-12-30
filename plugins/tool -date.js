module.exports = {
    command: "date",
    description: "Check the current date.",
    category: "tools",
execute: async (sock, m, { reply }) => {
    try {
        // Get current date
        const now = new Date();
        
        // Get the formatted date (e.g., "Monday, January 15, 2025")
        const currentDate = now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        
        // Send the current date as reply
        reply(`📅 Current Date: ${currentDate}`);
    } catch (e) {
        console.error("Error in .date command:", e);
        reply("❌ An error occurred. Please try again later.");
    }
} };