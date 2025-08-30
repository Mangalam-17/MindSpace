const express = require("express");
const auth = require("../middleware/auth");
const Mood = require("../models/Mood");
const router = express.Router();

// Map mood strings to numeric values
const moodMap = {
  happy: 5,
  neutral: 3,
  sad: 1,
  angry: 2,
  calm: 4,
  anxious: 2,
};

// Add mood entry with conversion
router.post("/", auth, async (req, res) => {
  try {
    let moodValue = req.body.mood;
    if (typeof moodValue === "string") {
      moodValue = moodMap[moodValue.toLowerCase()] ?? 0;
    }
    const mood = new Mood({
      userId: req.user.id,
      mood: moodValue,
      date: req.body.date ? new Date(req.body.date) : new Date(),
    });
    await mood.save();
    res.status(201).json(mood);
  } catch (error) {
    console.error("Failed to add mood:", error);
    res
      .status(500)
      .json({ message: "Failed to add mood", error: error.message });
  }
});

// ... rest of the code remains unchanged ...

module.exports = router;

// Get moods (limit last 30)
router.get("/", auth, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(30);
    res.json(moods);
  } catch (error) {
    console.error("Failed to fetch moods:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch moods", error: error.message });
  }
});

// Delete all moods for authenticated user
router.delete("/", auth, async (req, res) => {
  try {
    await Mood.deleteMany({ userId: req.user.id });
    res.status(200).json({ message: "All moods deleted" });
  } catch (error) {
    console.error("Failed to delete moods:", error);
    res
      .status(500)
      .json({ message: "Failed to delete moods", error: error.message });
  }
});

module.exports = router;
