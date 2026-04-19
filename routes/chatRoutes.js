const express = require("express");
const router = express.Router();
const faculty = require("../facultyData.json");
const getAIResponse = require("../utils/aiService");

router.post("/", async (req, res) => {
  const { query } = req.body;

  try {
    const context = faculty.map(f =>
      `${f.name} specializes in ${f.domain}`
    ).join("\n");

    const prompt = `
You are an academic assistant.
Only recommend from the given faculty list.

Faculty Data:
${context}

Student Query:
${query}

Suggest best faculty.
`;

    const aiReply = await getAIResponse(prompt);

    res.json({
      query,
      recommendation: aiReply
    });

  } catch (err) {
    res.status(500).json({ error: "Chat failed" });
  }
});

module.exports = router;