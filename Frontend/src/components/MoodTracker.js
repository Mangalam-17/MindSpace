import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { api } from "../lib/api"; // centralized axios instance

const moodColors = {
  happy: "#d4edda",
  sad: "#f8d7da",
  neutral: "#fff3cd",
  angry: "#f5c6cb",
  calm: "#cfe2ff",
  anxious: "#fbe8a6",
};

const moodTextColors = {
  happy: "#257a36",
  sad: "#a32026",
  neutral: "#9c7800",
  angry: "#96243d",
  calm: "#1557a6",
  anxious: "#947008",
};

const moodMap = {
  happy: 5,
  neutral: 3,
  sad: 1,
  angry: 2,
  calm: 4,
  anxious: 2,
};

export default function MoodTracker({
  token: propToken,
  onMoodChange,
  darkMode,
}) {
  const token = propToken || localStorage.getItem("token");
  const [selectedMood, setSelectedMood] = useState("");
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    fetchMoods();
  }, [token]);

  const fetchMoods = async () => {
    if (!token) return;
    try {
      const res = await api.get("/api/moods", {
        headers: { "x-auth-token": token },
      });
      setMoods(res.data);
      if (res.data.length > 0 && onMoodChange)
        onMoodChange(res.data[0].mood.toLowerCase());
    } catch (e) {
      console.error(e);
    }
  };

  const handleMoodSubmit = async (mood) => {
    if (!mood || !token) return;
    try {
      const numericMood = moodMap[mood.toLowerCase()] ?? 0;
      await api.post(
        "/api/moods",
        { mood: numericMood },
        { headers: { "x-auth-token": token } }
      );
      setSelectedMood("");
      fetchMoods();
      if (onMoodChange) onMoodChange(mood);
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetMoods = async () => {
    if (!window.confirm("Are you sure you want to delete all your moods?"))
      return;
    try {
      await api.delete("/api/moods", {
        headers: { "x-auth-token": token },
      });
      setMoods([]);
      if (onMoodChange) onMoodChange(null);
    } catch (e) {
      console.error("Failed to reset moods.", e);
      alert("Failed to reset moods. Please try again.");
    }
  };

  const getMoodString = (num) =>
    Object.keys(moodMap).find((key) => moodMap[key] === Number(num)) ||
    "neutral";

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: darkMode ? "#f26363" : "#444",
          fontWeight: 700,
          fontSize: { xs: "1.15rem", md: "1.35rem" }, // responsive title size
        }}
      >
        How are you feeling right now?
      </Typography>

      {/* Mood buttons: wrap and space for touch on phones */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, sm: 1.25 },
          flexWrap: "wrap",
          mb: { xs: 2, md: 3 },
        }}
      >
        {Object.keys(moodColors).map((mood) => (
          <Button
            key={mood}
            variant={selectedMood === mood ? "contained" : "outlined"}
            sx={{
              bgcolor: moodColors[mood],
              color: moodTextColors[mood],
              fontWeight: "bold",
              px: { xs: 1.25, md: 1.5 },
              py: { xs: 0.6, md: 0.75 },
              minHeight: 36,
              borderColor:
                selectedMood === mood
                  ? darkMode
                    ? "#555"
                    : "#fac7be"
                  : "inherit",
              boxShadow:
                selectedMood === mood ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": {
                bgcolor: moodColors[mood],
                color: moodTextColors[mood],
                transform: "scale(1.06)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              },
            }}
            onClick={() => {
              setSelectedMood(mood);
              handleMoodSubmit(mood);
            }}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </Button>
        ))}
      </Box>

      <Button
        variant="outlined"
        color="error"
        sx={{
          mb: { xs: 1.5, md: 2 },
          px: { xs: 1.25, md: 1.5 },
          py: { xs: 0.6, md: 0.75 },
          minHeight: 36,
          transition: "background-color 0.3s ease, color 0.3s ease",
          "&:hover": {
            backgroundColor: darkMode ? "#7c2222" : "#ffc2c2",
            color: darkMode ? "#e0a7a7" : "#a93b3b",
          },
        }}
        onClick={handleResetMoods}
      >
        Reset Mood Tracker
      </Button>

      <Paper
        sx={{
          bgcolor: darkMode ? "#282c34" : "#fff",
          mt: 2,
          boxShadow: darkMode ? "0 6px 26px #232732" : "0 2px 12px #fac7be",
          borderRadius: 3,
          p: { xs: 1.5, md: 2 },
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: darkMode ? "#f26363" : "#9c462d",
            fontWeight: 700,
            mb: { xs: 1.25, md: 2 },
            fontSize: { xs: "1.05rem", md: "1.15rem" },
            transition: "color 0.3s ease",
          }}
        >
          Your recent moods
        </Typography>

        <List dense sx={{ pr: { xs: 0, md: 1 } }}>
          {moods.length === 0 && (
            <Typography
              px={{ xs: 1, md: 2 }}
              sx={{
                color: darkMode ? "#b0b2be" : "#7a3f2b",
                transition: "color 0.3s ease",
                mb: { xs: 1, md: 0 },
              }}
            >
              No moods recorded yet.
            </Typography>
          )}
          {moods.map((mood) => {
            const moodName = getMoodString(mood.mood);
            return (
              <ListItem
                key={mood._id}
                sx={{
                  bgcolor:
                    moodColors[moodName] || (darkMode ? "#394151" : "#fff3cd"),
                  mb: { xs: 1, md: 1.5 },
                  borderRadius: 2,
                  boxShadow: darkMode
                    ? "0 4px 12px #192028"
                    : "0 3px 12px #e0aaff",
                  border: darkMode ? "1px solid #232732" : "none",
                  p: { xs: 1, md: 1.2 },
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: darkMode
                      ? "0 8px 28px #202c3d"
                      : "0 5px 16px #d6ebff",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <span
                      style={{
                        color:
                          moodTextColors[moodName] ||
                          (darkMode ? "#fff" : "#222"),
                        fontWeight: 600,
                        fontSize: "1.05em",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {moodName.charAt(0).toUpperCase() + moodName.slice(1)}
                    </span>
                  }
                  secondary={
                    <span
                      style={{
                        color: darkMode ? "#554d6e" : "#844",
                        fontSize: "0.92em",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {new Date(mood.date).toLocaleString()}
                    </span>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </>
  );
}
