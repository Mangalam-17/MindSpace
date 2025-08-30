const express = require("express");
const auth = require("../middleware/auth");
const CreativeContent = require("../models/CreativeContent");
const router = express.Router();

// Submit creative content (text or links)
router.post("/", auth, async (req, res) => {
  try {
    const content = new CreativeContent({
      userId: req.user.id,
      contentType: req.body.contentType,
      contentData: req.body.contentData,
      moodAtSubmission: req.body.mood,
    });
    await content.save();
    res.json(content);
  } catch {
    res.status(500).json({ message: "Failed to save creative content" });
  }
});

// Get user's creative content
router.get("/", auth, async (req, res) => {
  try {
    const contents = await CreativeContent.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(contents);
  } catch {
    res.status(500).json({ message: "Failed to fetch creative content" });
  }
});

// Placeholder for AI prompt generation (dummy)
router.get("/prompt", auth, async (req, res) => {
  // In real app, connect to OpenAI/generative AI here
  const mood = req.query.mood || "neutral";
  const samplePrompts = {
    happy: "Write a joyful poem about your day.",
    sad: "Create comforting lyrics reflecting calmness.",
    neutral: "Draw a simple sketch representing balance.",
  };
  res.json({ prompt: samplePrompts[mood] || samplePrompts["neutral"] });
});

module.exports = router;
