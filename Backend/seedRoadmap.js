require("dotenv").config();
const mongoose = require("mongoose");
const RoadmapStep = require("./models/RoadmapStep");

// Replace with your actual MongoDB connection URI
const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("Missing MONGO_URI/MONGODB_URI in environment");
  process.exit(1);
}
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB for seeding roadmap steps.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const steps = [
  { step: "Daily mindfulness meditation", completed: false },
  { step: "Reflect weekly in journal", completed: false },
  { step: "Join Support Circle group", completed: false },
  { step: "Attend local wellness event", completed: false },
  { step: "Practice deep breathing", completed: false },
  { step: "Read a mental health article", completed: false },
  { step: "Talk to a supportive friend", completed: false },
  { step: "Try a creative therapy activity", completed: false },
  { step: "Set one self-care goal", completed: false },
  { step: "Track your mood for a week", completed: false },
];

async function seed() {
  try {
    await RoadmapStep.deleteMany({}); // Clear existing steps, optional
    await RoadmapStep.insertMany(steps);
    console.log("Roadmap steps seeded successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
