const express = require("express");
const auth = require("../middleware/auth");
const RoadmapStep = require("../models/RoadmapStep");
const router = express.Router();

// Get all roadmap steps
router.get("/", auth, async (req, res) => {
  try {
    // If user-specific, filter by user: req.user.id
    const steps = await RoadmapStep.find();
    res.json(steps);
  } catch (error) {
    res.status(500).json({ message: "Failed to get roadmap steps" });
  }
});

// Update completed status of a roadmap step by ID
router.put("/:id", auth, async (req, res) => {
  try {
    const stepId = req.params.id;
    const { completed } = req.body;
    const step = await RoadmapStep.findById(stepId);
    if (!step) {
      return res.status(404).json({ message: "Roadmap step not found" });
    }
    step.completed = completed;
    await step.save();
    res.json(step);
  } catch (error) {
    res.status(500).json({ message: "Failed to update roadmap step" });
  }
});

module.exports = router;
