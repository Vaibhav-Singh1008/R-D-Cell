const express = require("express");
const router = express.Router();
const faculty = require("../facultyData.json");
const sendEmail = require("../utils/emailService");

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const random = faculty[Math.floor(Math.random() * faculty.length)];

    await sendEmail(
      email,
      "🎯 Spin Result",
      `You got: ${random.name} (${random.domain})`
    );

    res.json({
      success: true,
      result: random
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email failed" });
  }
});

module.exports = router;