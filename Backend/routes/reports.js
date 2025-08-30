const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Mood = require("../models/Mood");

router.get("/", auth, async (req, res) => {
  try {
    // Confirm user authentication
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ message: "Authentication error: user not found" });
    }
    const userId = req.user.id;

    // Calculate the start date for the 7-day window
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setHours(0, 0, 0, 0);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    // Fetch mood entries for user within last 7 days
    const moods = await Mood.find({
      userId: userId, // Use "userId" as in your model
      date: { $gte: sevenDaysAgo },
    }).sort({ date: 1 });

    // Map moods by date string for chart rendering
    const moodMap = {};
    moods.forEach((m) => {
      // Make sure "m.date" exists and is valid
      const dateKey = m.date ? m.date.toISOString().slice(0, 10) : null;
      if (dateKey) {
        moodMap[dateKey] =
          typeof m.mood === "number" ? m.mood : parseInt(m.mood, 10);
      }
    });

    // Prepare graph  7 days, fill missing with zero
    const moodGraphData = [];
    const moodGraphDates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      moodGraphDates.push(key);
      moodGraphData.push(moodMap[key] ?? 0);
    }

    const report = {
      summary:
        "Your mood has been generally stable with occasional highs and lows.",
      suggestions: [
        "Practice deep breathing exercises during anxious moments.",
        "Maintain gratitude journal daily.",
        "Continue attending support group chats.",
      ],
      moodGraphData,
      moodGraphDates,
    };

    res.json(report);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Server error generating report" });
  }
});

module.exports = router;
