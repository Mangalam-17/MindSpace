import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { api } from "../lib/api"; // centralized axios instance

const contentTypes = [
  { value: "poetry", label: "Poetry" },
  { value: "art", label: "Art (URL)" },
  { value: "music", label: "Music (URL)" },
];

const moodSuggestions = ["Happy", "Sad", "Calm", "Anxious", "Angry", "Neutral"];

const dailyChallenges = {
  happy: "Write a poem celebrating a joyful moment.",
  sad: "Draw a picture that represents overcoming sadness.",
  calm: "Compose a short calming melody or describe your peaceful place.",
  anxious: "Express your anxieties in a freeform journal entry.",
  angry: "Channel anger into abstract art or powerful poetry.",
  neutral: "Create something that reflects neutrality and balance.",
};

const randomPrompts = [
  "Write a letter to your future self.",
  "Describe a place you’d love to visit.",
  "Create a poem about the color blue.",
  "Sketch a scene from a dream you had.",
  "List 5 things you’re grateful for today.",
];

export default function CreativeTherapy({ token }) {
  const [contentType, setContentType] = useState("poetry");
  const [contentData, setContentData] = useState("");
  const [mood, setMood] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (mood) {
      const moodKey = mood.toLowerCase();
      const challenge =
        dailyChallenges[moodKey] ||
        "Create something that expresses your current feelings.";
      setPrompt(challenge);
    } else {
      setPrompt("Select a mood to get your daily creative challenge.");
    }
  }, [mood]);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get("/api/creative", {
        headers: { "x-auth-token": token },
      });
      setSubmissions(res.data);
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contentData) {
      setError("Please input your creative content or link.");
      return;
    }
    setError("");
    try {
      await api.post(
        "/api/creative",
        { contentType, contentData, mood },
        { headers: { "x-auth-token": token } }
      );
      setContentData("");
      fetchSubmissions();
    } catch {
      setError("Failed to submit content.");
    }
  };

  const handleRandomPrompt = () => {
    const p = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    setPrompt(p);
  };

  const toggleFavorite = (promptText) => {
    setFavorites((prev) =>
      prev.includes(promptText)
        ? prev.filter((p) => p !== promptText)
        : [...prev, promptText]
    );
  };

  const isFavorite = (promptText) => favorites.includes(promptText);

  return (
    <Paper
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#232531" : "#fff6f0",
        border: (theme) =>
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.06)",
      }}
      elevation={0}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: { xs: 1.5, md: 2 },
          fontSize: { xs: "1.15rem", md: "1.35rem" },
          color: (theme) =>
            theme.palette.mode === "dark" ? "#eaf6ff" : "#4a251a",
        }}
      >
        AI-Driven Creative Therapy
      </Typography>

      {/* Controls row: responsive Stack */}
      <Stack
        spacing={{ xs: 1.25, sm: 2 }}
        direction={{ xs: "column", sm: "row" }}
        sx={{ mb: { xs: 1.5, md: 2 } }}
      >
        <TextField
          select
          label="Content Type"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          fullWidth
        >
          {contentTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Mood (optional)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          fullWidth
          select
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {moodSuggestions.map((m) => (
            <MenuItem key={m} value={m.toLowerCase()}>
              {m}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {/* Prompt row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 1.5 },
          mb: { xs: 1.5, md: 2 },
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            flexGrow: 1,
            fontStyle: "italic",
            whiteSpace: "pre-line",
            fontSize: { xs: "0.95rem", md: "1rem" },
          }}
        >
          {loadingPrompt ? (
            <CircularProgress size={20} />
          ) : (
            prompt || "Select your mood to get a creative challenge."
          )}
        </Typography>

        {prompt && (
          <IconButton onClick={() => toggleFavorite(prompt)} size="small">
            {isFavorite(prompt) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        )}
        <Button
          onClick={handleRandomPrompt}
          sx={{
            ml: { xs: 0, sm: 0.5 },
            px: { xs: 1.25, md: 1.5 },
            py: { xs: 0.6, md: 0.75 },
            minHeight: 36,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Random Prompt
        </Button>
      </Box>

      {/* Content input */}
      <TextField
        label={
          contentType === "poetry"
            ? "Your Poem"
            : `Provide URL to your ${contentType}`
        }
        fullWidth
        multiline={contentType === "poetry"}
        minRows={contentType === "poetry" ? 4 : 1}
        value={contentData}
        onChange={(e) => setContentData(e.target.value)}
        sx={{ mb: { xs: 1.5, md: 2 } }}
        error={!!error}
        helperText={error}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          mb: { xs: 2, md: 3 },
          px: { xs: 1.5, md: 2 },
          py: { xs: 0.7, md: 0.9 },
          minHeight: 38,
          textTransform: "none",
          fontWeight: 800,
        }}
      >
        Submit
      </Button>

      {/* Favorites */}
      {favorites.length > 0 && (
        <Box sx={{ mb: { xs: 2, md: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: { xs: 1, md: 1.5 },
              fontSize: { xs: "1.05rem", md: "1.15rem" },
            }}
          >
            Favorite Prompts
          </Typography>
          <List dense>
            {favorites.map((fav, i) => (
              <ListItem key={i} sx={{ mb: 0.5 }}>
                <ListItemText primary={fav} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Submissions */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.05rem", md: "1.15rem" },
        }}
      >
        Your Submissions
      </Typography>
      {submissions.length === 0 && (
        <Typography sx={{ mb: 1.5 }}>No submissions yet.</Typography>
      )}
      <List dense>
        {submissions.map((sub) => (
          <ListItem key={sub._id} sx={{ alignItems: "flex-start" }}>
            <ListItemText
              primary={`${sub.contentType.charAt(0).toUpperCase() + sub.contentType.slice(1)} (${sub.moodAtSubmission || "Mood N/A"})`}
              secondary={
                sub.contentType === "poetry" ? (
                  sub.contentData
                ) : (
                  <a
                    href={sub.contentData}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sub.contentData}
                  </a>
                )
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
