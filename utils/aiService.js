const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getAIResponse = async (prompt) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are an academic assistant." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("AI ERROR:", error.message);
    return "AI failed to respond";
  }
};

module.exports = getAIResponse;