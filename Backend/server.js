require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/mood");
const creativeRoutes = require("./routes/creative");
const supportCircleRoutes = require("./routes/supportCircle");
const roadmapRoutes = require("./routes/roadmap");
const reportsRoutes = require("./routes/reports");
const resourcesRoutes = require("./routes/resources");
const socketIo = require("socket.io");
const User = require("./models/User"); // Import User model for senderName

const app = express();
const server = http.createServer(app);

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://mind-space-sigma.vercel.app",
];

// Socket.IO setup with cors
const io = new socketIo.Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// DB connection
connectDB();

// Express CORS and JSON middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Register API routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/creative", creativeRoutes);
app.use("/api/supportCircles", supportCircleRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/resources", resourcesRoutes);

// Socket.io real-time chat for Support Circles
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinCircle", (circleId) => {
    socket.join(circleId);
    console.log(`Socket ${socket.id} joined circle ${circleId}`);
  });

  socket.on("supportCircleMessage", async ({ circleId, senderId, text }) => {
    try {
      const user = await User.findById(senderId);
      const senderName = user ? user.name : "Unknown User";

      // Debug log to verify what is emitted
      console.log("Sending message:", {
        senderId,
        senderName,
        text,
        createdAt: new Date(),
      });

      io.to(circleId).emit("newMessage", {
        senderId,
        senderName,
        text,
        createdAt: new Date(),
      });
    } catch (err) {
      console.error("Error processing supportCircleMessage:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Listen on port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
