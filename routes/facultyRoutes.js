const express = require("express");
const router = express.Router();
const faculty = require("../facultyData.json");

// GET all faculty
router.get("/", (req, res) => {
  res.json(faculty);
});

// SEARCH faculty
router.get("/search", (req, res) => {
  const query = (req.query.query || "").toLowerCase();

  const result = faculty.filter(f =>
    f.name.toLowerCase().includes(query) ||
    f.domain.toLowerCase().includes(query)
  );

  res.json(result);
});

module.exports = router;