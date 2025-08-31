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

// 1) Centralize allowed origins for dev + prod
const allowedOrigins = [
  "http://localhost:3000",
  "https://mind-space-sigma.vercel.app",
];

// 2) Socket.IO with CORS (include GET/POST)
const io = new socketIo.Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// DB connection
connectDB();

// 3) Express CORS for REST API
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// 4) Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// API Routes
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

      io.to(circleId).emit("newMessage", {
        senderId,
        senderName, // Send user name instead of just ID
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

// 5) Bind to platform port in prod, 5000 locally
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
