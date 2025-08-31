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
      roadmapProgress: [],
    });

    await user.save();
    console.log("New user registered with roadmapProgress:", user.roadmapProgress);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ token, username: user.username });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login with debug logs
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt received:", { username, password }); // Log incoming data
  try {
    const user = await User.findOne({ username });
    console.log("User found:", user);

    if (!user) {
      console.log("Login failed: User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const validPass = await bcrypt.compare(password, user.password);
    console.log("Password valid:", validPass);

    if (!validPass) {
      console.log("Login failed: Incorrect password");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, username: user.username });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
