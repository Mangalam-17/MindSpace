const express = require("express");
const auth = require("../middleware/auth");
const RoadmapStep = require("../models/RoadmapStep");
const User = require("../models/User"); // Import the User model
const router = express.Router();

// Get all roadmap steps merged with user-specific completion status
router.get("/", auth, async (req, res) => {
  try {
    const steps = await RoadmapStep.find();
    const user = await User.findById(req.user.id);

    const mergedSteps = steps.map((step) => {
      const progress = user.roadmapProgress.find(
        (p) => p.stepId.toString() === step._id.toString()
      );
      return {
        ...step.toObject(),
        completed: progress ? progress.completed : false,
      };
    });

    res.json(mergedSteps);
  } catch (error) {
    res.status(500).json({ message: "Failed to get roadmap steps" });
  }
});

// Update completed status for a roadmap step for the authenticated user
router.put("/:id", auth, async (req, res) => {
  try {
    const stepId = req.params.id;
    const { completed } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find existing progress record for this step, if any
    let progress = user.roadmapProgress.find(
      (p) => p.stepId.toString() === stepId
    );

    if (progress) {
      // Update the existing progress
      progress.completed = completed;
    } else {
      // Add new progress record
      user.roadmapProgress.push({ stepId, completed });
    }

    await user.save();

    res.json({ stepId, completed });
  } catch (error) {
    res.status(500).json({ message: "Failed to update roadmap step" });
  }
});

module.exports = router;
