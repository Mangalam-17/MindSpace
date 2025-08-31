import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
} from "@mui/material";
import { api } from "../lib/api"; // centralized axios instance
import { io } from "socket.io-client";

const SOCKET_SERVER_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function SupportCircle({ token, userId }) {
  const [circles, setCircles] = useState([]);
  const [newCircleName, setNewCircleName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [socket, setSocket] = useState(null);
  const bottomRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  useEffect(() => {
    fetchCircles();
  }, []);

  useEffect(() => {
    if (selectedCircle && token) {
      const socketIo = io(SOCKET_SERVER_URL, { auth: { token } });
      socketIo.emit("joinCircle", selectedCircle._id);
      socketIo.on("newMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });
      setSocket(socketIo);
      return () => {
        socketIo.disconnect();
        setMessages([]);
      };
    }
  }, [selectedCircle, token]);

  const fetchCircles = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/supportCircles", {
        headers: { "x-auth-token": token },
      });
      setCircles(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleCreateCircle = async () => {
    if (!newCircleName.trim()) {
      setError("Circle name cannot be empty.");
      return;
    }
    setError("");
    try {
      await api.post(
        "/api/supportCircles",
        { name: newCircleName },
        { headers: { "x-auth-token": token } }
      );
      setNewCircleName("");
      fetchCircles();
      setSnackbarMsg("Support Circle created!");
      setSnackbarOpen(true);
    } catch {
      setError("Failed to create support circle.");
    }
  };

  const handleJoinLeave = async (circleId, isMember) => {
    try {
      if (isMember) {
        await api.post(
          `/api/supportCircles/${circleId}/leave`,
          {},
          { headers: { "x-auth-token": token } }
        );
        if (selectedCircle && selectedCircle._id === circleId)
          setSelectedCircle(null);
      } else {
        await api.post(
          `/api/supportCircles/${circleId}/join`,
          {},
          { headers: { "x-auth-token": token } }
        );
      }
      fetchCircles();
    } catch (e) {
      console.error(e);
    }
  };

  const isUserMember = (circle) => circle.members.includes(userId);

  const handleSendMessage = () => {
    if (messageText.trim() && socket && selectedCircle) {
      socket.emit("supportCircleMessage", {
        circleId: selectedCircle._id,
        senderId: userId,
        text: messageText.trim(),
      });
      setMessageText("");
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Box sx={{ p: { xs: 0, md: 0 } }}>
      {!selectedCircle && (
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            mb: { xs: 2, md: 3 },
            borderRadius: 3,
          }}
          elevation={0}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 700, fontSize: { xs: "1.15rem", md: "1.35rem" } }}
          >
            Support Circles
          </Typography>

          {/* Create circle row */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, md: 2 },
              mb: { xs: 2, md: 3 },
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="New support circle name"
              value={newCircleName}
              onChange={(e) => setNewCircleName(e.target.value)}
              fullWidth
              error={!!error}
              helperText={error}
              sx={{ minWidth: { xs: "100%", sm: 300 }, flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleCreateCircle}
              sx={{
                px: { xs: 1.25, md: 2 },
                py: { xs: 0.6, md: 0.8 },
                minHeight: 36,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Create
            </Button>
          </Box>

          <Divider sx={{ mb: { xs: 1.5, md: 2 } }} />

          {loading ? (
            <Typography sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}>
              Loading circles...
            </Typography>
          ) : (
            <List dense sx={{ gap: { xs: 1, md: 1 }, display: "grid" }}>
              {circles.length === 0 && (
                <Typography sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}>
                  No support circles found.
                </Typography>
              )}
              {circles.map((circle) => {
                const member = isUserMember(circle);
                return (
                  <ListItem
                    key={circle._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: { xs: 1, md: 1 },
                      bgcolor: "#f5f5f5",
                      borderRadius: 1,
                      pr: { xs: 1.5, md: 2 },
                      py: { xs: 1, md: 1 },
                      flexWrap: "wrap",
                      gap: { xs: 1, md: 0 },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1rem", md: "1.05rem" },
                          }}
                        >
                          {circle.name}
                        </Typography>
                      }
                      secondary={`${circle.members.length} member${
                        circle.members.length !== 1 ? "s" : ""
                      }`}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        variant={member ? "outlined" : "contained"}
                        color={member ? "secondary" : "primary"}
                        onClick={() => handleJoinLeave(circle._id, member)}
                        sx={{
                          mr: { xs: 0, md: 1 },
                          px: { xs: 1.25, md: 1.5 },
                          py: { xs: 0.4, md: 0.6 },
                          minHeight: 32,
                          textTransform: "none",
                          fontWeight: 700,
                        }}
                      >
                        {member ? "Leave" : "Join"}
                      </Button>
                      {member && (
                        <Button
                          variant="contained"
                          onClick={() => setSelectedCircle(circle)}
                          sx={{
                            px: { xs: 1.25, md: 1.5 },
                            py: { xs: 0.4, md: 0.6 },
                            minHeight: 32,
                            textTransform: "none",
                            fontWeight: 700,
                          }}
                        >
                          Enter Chat
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Paper>
      )}

      {selectedCircle && (
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }} elevation={0}>
          <Button
            variant="outlined"
            onClick={() => setSelectedCircle(null)}
            sx={{
              mb: { xs: 1.5, md: 2 },
              px: { xs: 1.25, md: 1.5 },
              py: { xs: 0.5, md: 0.7 },
              minHeight: 34,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Back to Circles
          </Button>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: { xs: "1.05rem", md: "1.15rem" } }}
          >
            Chat: {selectedCircle.name}
          </Typography>
          <Box
            sx={{
              height: { xs: 260, md: 300 },
              overflowY: "auto",
              border: "1px solid #ccc",
              p: { xs: 1.5, md: 2 },
              mb: { xs: 1.5, md: 2 },
              backgroundColor: "#fafafa",
              borderRadius: 2,
            }}
          >
            {messages.length === 0 && (
              <Typography
                color="text.secondary"
                sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
              >
                No messages yet.
              </Typography>
            )}
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  mb: 1,
                  p: 1,
                  bgcolor: msg.senderId === userId ? "#cce5ff" : "#e2e2e2",
                  borderRadius: 1,
                  maxWidth: { xs: "85%", md: "75%" },
                  ml: msg.senderId === userId ? "auto" : 0,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {msg.senderName || msg.senderId}
                </Typography>
                <Typography variant="body1">{msg.text}</Typography>
              </Box>
            ))}
            <div ref={bottomRef} />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, md: 1 },
              flexWrap: "wrap",
            }}
          >
            <TextField
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              fullWidth
              placeholder="Type your message"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              sx={{ minWidth: { xs: "100%", sm: 280 }, flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              sx={{
                px: { xs: 1.25, md: 1.5 },
                py: { xs: 0.6, md: 0.8 },
                minHeight: 36,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMsg}
        autoHideDuration={3000}
      />
    </Box>
  );
}
