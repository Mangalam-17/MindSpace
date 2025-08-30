const express = require("express");
const auth = require("../middleware/auth");
const SupportCircle = require("../models/SupportCircle");
const router = express.Router();

// Create support circle
router.post("/", auth, async (req, res) => {
  try {
    const circle = new SupportCircle({
      name: req.body.name,
      members: [req.user.id],
      isPrivate: req.body.isPrivate !== undefined ? req.body.isPrivate : true,
    });
    await circle.save();
    res.json(circle);
  } catch {
    res.status(500).json({ message: "Failed to create circle" });
  }
});

// Join support circle
router.post("/:id/join", auth, async (req, res) => {
  try {
    const circle = await SupportCircle.findById(req.params.id);
    if (!circle) return res.status(404).json({ message: "Circle not found" });
    if (!circle.members.includes(req.user.id)) {
      circle.members.push(req.user.id);
      await circle.save();
    }
    res.json(circle);
  } catch {
    res.status(500).json({ message: "Failed to join circle" });
  }
});

// Leave support circle
router.post("/:id/leave", auth, async (req, res) => {
  try {
    const circle = await SupportCircle.findById(req.params.id);
    if (!circle) return res.status(404).json({ message: "Circle not found" });
    circle.members = circle.members.filter(
      (memberId) => memberId.toString() !== req.user.id
    );
    await circle.save();
    res.json(circle);
  } catch {
    res.status(500).json({ message: "Failed to leave circle" });
  }
});

// Get all circles (for discovering & joining)
router.get("/", auth, async (req, res) => {
  try {
    const circles = await SupportCircle.find();
    res.json(circles);
  } catch {
    res.status(500).json({ message: "Failed to fetch circles" });
  }
});

// Placeholder for chatting handled by Socket.IO (handle in server.js)

module.exports = router;
