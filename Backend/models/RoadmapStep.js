const mongoose = require("mongoose");

const RoadmapStepSchema = new mongoose.Schema({
  step: { type: String, required: true },
  completed: { type: Boolean, default: false },
  // Optional: track user if roadmap is user-specific
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("RoadmapStep", RoadmapStepSchema);
