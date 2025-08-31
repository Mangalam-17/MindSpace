const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String }, // Optional display name field
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  roadmapProgress: [
    {
      stepId: { type: mongoose.Schema.Types.ObjectId, ref: "RoadmapStep" },
      completed: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
