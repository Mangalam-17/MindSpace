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

const app = express();
const server = http.createServer(app);

// 1) Centralize allowed origins for dev + prod
const allowedOrigins = [
  "http://localhost:3000", // local frontend
  "'https://mind-space-sigma.vercel.app'", // replace after frontend deploy
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

// 4) Health check (useful for Render)
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

  socket.on("supportCircleMessage", ({ circleId, senderId, text }) => {
    io.to(circleId).emit("newMessage", {
      senderId,
      text,
      createdAt: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// 5) Bind to platform port in prod, 5000 locally
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
