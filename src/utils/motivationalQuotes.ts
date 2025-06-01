
// Fetch motivational quotes from a public API
export const fetchMotivationalQuote = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=motivational,inspirational,success');
    const data = await response.json();
    return `${data.content} - ${data.author}`;
  } catch (error) {
    // Fallback quotes if API fails
    const fallbackQuotes = [
      "The way to get started is to quit talking and begin doing. - Walt Disney",
      "Don't let yesterday take up too much of today. - Will Rogers",
      "You learn more from failure than from success. - Unknown",
      "If you are working on something exciting that you really care about, you don't have to be pushed. The vision pulls you. - Steve Jobs",
      "The future belongs to those who learn more skills and combine them in creative ways. - Robert Greene"
    ];
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  }
};
