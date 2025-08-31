const mongoose = require("mongoose");

const RoadmapStepSchema = new mongoose.Schema({
  step: { type: String, required: true },
  // Remove 'completed' field to avoid global shared state
});

module.exports = mongoose.model("RoadmapStep", RoadmapStepSchema);
