const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (await User.findOne({ username }))
      return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashed,
      roadmapProgress: [], // Initialize empty roadmap progress
    });

    await user.save();
    console.log(
      "New user registered with roadmapProgress:",
      user.roadmapProgress
    );

    // Generate token immediately after registration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Respond with token and user info for auto login
    res.status(201).json({ token, username: user.username });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login (no change needed)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, username: user.username });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
