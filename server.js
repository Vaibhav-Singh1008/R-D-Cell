// const connectDB = require("./config/db"); // MongoDB bypass
// connectDB(); // MongoDB bypass

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs"); // File system for JSON

const app = express();

app.use(cors());
app.use(express.json());

// --- EMERGENCY BYPASS ROUTES (FOR DEMO) ---

// 1. Login Bypass - Hamesha success bhejega
app.post("/api/auth/login", (req, res) => {
  console.log("Login request received, bypassing...");
  res.json({ 
    success: true, 
    token: "demo-token-12345", 
    user: { name: "Antra Priyadarshini", role: "Admin" } 
  });
});

// 2. Faculty Data Bypass - JSON file se data load karega
app.get("/api/faculty", (req, res) => {
  try {
    const facultyData = JSON.parse(fs.readFileSync("./facultyData.json", "utf8"));
    res.json(facultyData);
  } catch (err) {
    res.status(500).json({ error: "facultyData.json not found in root" });
  }
});

// --- ORIGINAL ROUTES ---
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/spin", require("./routes/spinRoutes"));
// app.use("/api/auth", require("./routes/authRoutes")); // Authenticated via bypass above

// Test route
app.get("/", (req, res) => {
  res.send("PS 8 Backend Running in Demo Mode (Bypass Active)");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("⚠️  MongoDB Bypassed for Hackathon Demo");
});