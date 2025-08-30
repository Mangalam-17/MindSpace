import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { api } from "../lib/api"; // centralized axios instance

const numberToMood = {
  5: "Happy",
  4: "Calm",
  3: "Neutral",
  2: "Angry",
  1: "Sad",
};
const moodEmojis = {
  Happy: "😊",
  Sad: "😞",
  Neutral: "😐",
  Angry: "😠",
  Calm: "😌",
};
const defaultSuggestions = [
  // ...your suggestions from before
];

export default function InsightReports({ token, moodUpdatedAt, darkMode }) {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/moods", { headers: { "x-auth-token": token } })
      .then((res) => {
        setMoods(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [token, moodUpdatedAt]);

  const bgColor = darkMode ? "#232531" : "#ffeceb";
  const cardBg = darkMode ? "#292b36" : "#fff";
  const accentText = darkMode ? "#eafcfc" : "#ad4a00";
  const accentBar = darkMode ? "#8ffefc" : "#f07a7aff";
  const emptyPaperBg = darkMode ? "#232531" : "#ffeceb";
  const iconColor = darkMode ? "#8ffefc" : "#fab6b6";

  if (loading)
    return <Typography sx={{ p: { xs: 1, md: 0 } }}>Loading...</Typography>;
  if (error)
    return (
      <Typography sx={{ p: { xs: 1, md: 0 } }}>Error loading moods.</Typography>
    );

  if (moods.length === 0)
    return (
      <Paper
        sx={{
          p: { xs: 2, md: 4 },
          bgcolor: emptyPaperBg,
          borderRadius: 4,
          textAlign: "center",
          minHeight: { xs: 180, md: 240 },
          boxShadow: darkMode ? "0 4px 20px #14161c55" : "0 4px 20px #fad0be",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: { xs: 1, md: 2 },
            color: iconColor,
            fontSize: { xs: "2.2rem", md: "3rem" },
          }}
        >
          🧠
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            color: "#e3696c",
            fontSize: { xs: "1.05rem", md: "1.15rem" },
          }}
        >
          No mood records yet!
        </Typography>
        <Typography
          sx={{
            mb: { xs: 1.5, md: 2 },
            color: darkMode ? "#cccccc" : "#844",
            fontSize: { xs: "0.98rem", md: "1.07em" },
            px: { xs: 1, md: 0 },
          }}
        >
          Start logging how you feel in the Mood Tracker to unlock personalized
          insights here.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: darkMode ? "#7cd1e7" : "#df7422" }}
        >
          Your personal mood trends and achievement badges will appear after you
          begin tracking.
        </Typography>
      </Paper>
    );

  // Aggregations (unchanged)
  const counts = moods.reduce((acc, m) => {
    const moodKey =
      typeof m.mood === "number"
        ? numberToMood[m.mood]
        : numberToMood[Number(m.mood)] ||
          m.mood.charAt(0).toUpperCase() + m.mood.slice(1);
    acc[moodKey] = (acc[moodKey] || 0) + 1;
    return acc;
  }, {});
  const total = moods.length;
  const percentages = Object.entries(counts).map(([mood, count]) => ({
    mood,
    percent: ((count / total) * 100).toFixed(1),
  }));

  let longestMood = null,
    longestCount = 0,
    currentMood = null,
    currentCount = 0;
  moods.forEach(({ mood: m }) => {
    const moodName =
      typeof m === "number"
        ? numberToMood[m]
        : numberToMood[Number(m)] || m.charAt(0).toUpperCase() + m.slice(1);
    if (moodName === currentMood) currentCount++;
    else {
      currentMood = moodName;
      currentCount = 1;
    }
    if (currentCount > longestCount) {
      longestCount = currentCount;
      longestMood = currentMood;
    }
  });

  return (
    <Paper
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: bgColor,
        borderRadius: 4,
        boxShadow: darkMode ? "0 6px 24px #14161c50" : "0 6px 24px #fad0be",
      }}
    >
      <Typography
        variant="h5"
        mb={{ xs: 1.5, md: 2 }}
        sx={{
          fontWeight: 600,
          color: accentText,
          fontSize: { xs: "1.15rem", md: "1.35rem" },
        }}
      >
        AI-Powered Insight Report
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "#df7422", fontSize: { xs: "1.05rem", md: "1.15rem" } }}
      >
        Mood Percentages
      </Typography>

      {percentages.map(({ mood, percent }) => (
        <Box key={mood} sx={{ mb: { xs: 1.5, md: 2 } }}>
          <Typography
            sx={{
              color: darkMode ? "#eeeeee" : "#ad4a00",
              fontWeight: 500,
              fontSize: { xs: "0.98rem", md: "1rem" },
            }}
          >
            {mood} {moodEmojis[mood] || ""}: {percent}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={parseFloat(percent)}
            sx={{
              height: { xs: 10, md: 12 },
              borderRadius: 5,
              mt: 0.7,
              bgcolor: darkMode ? "#394151" : "#ffe5e9",
              "& .MuiLinearProgress-bar": {
                backgroundImage: darkMode
                  ? "linear-gradient(90deg, #75dde2, #cacedb)"
                  : "linear-gradient(90deg, #fab6b6, #fff6df)",
              },
            }}
          />
        </Box>
      ))}

      <Typography
        variant="h6"
        sx={{
          mt: { xs: 2.5, md: 4 },
          color: darkMode ? "#e2baff" : "#ad4a00",
          fontSize: { xs: "1.05rem", md: "1.15rem" },
        }}
      >
        Mood Streaks & Achievements
      </Typography>
      <Box sx={{ mb: { xs: 2, md: 3 } }}>
        {longestCount > 1 ? (
          <Typography
            sx={{
              color: darkMode ? "#eeeeee" : "#ad4a00",
              fontWeight: 500,
              fontSize: { xs: "0.98rem", md: "1rem" },
            }}
          >
            🎉 You have a streak of {longestCount} days feeling {longestMood}{" "}
            {moodEmojis[longestMood] || ""}!
          </Typography>
        ) : (
          <Typography
            sx={{
              color: darkMode ? "#eeeeee" : "#ad4a00",
              fontSize: { xs: "0.98rem", md: "1rem" },
            }}
          >
            No significant mood streak yet. Keep logging to discover your
            patterns!
          </Typography>
        )}
      </Box>

      <Typography
        variant="h6"
        sx={{
          mt: { xs: 2.5, md: 4 },
          color: darkMode ? "#f9e883" : "#df7422",
          fontSize: { xs: "1.05rem", md: "1.15rem" },
        }}
      >
        Suggestions
      </Typography>

      {defaultSuggestions.map((s, i) => (
        <Accordion
          key={i}
          sx={{
            mb: { xs: 1, md: 1.25 },
            borderRadius: 2,
            boxShadow: darkMode ? "0 2px 8px #39415140" : "0 2px 8px #ffe5e940",
            bgcolor: cardBg,
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              fontWeight: 600,
              color: darkMode ? "#ffffff" : "#ad4a00",
              minHeight: { xs: 44, md: 48 },
              "& .MuiAccordionSummary-content": {
                my: { xs: 0.25, md: 0.5 },
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: accentBar,
                fontSize: { xs: "0.98rem", md: "1rem" },
              }}
            >
              {s.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: { xs: 0.5, md: 1 } }}>
            <Typography
              variant="body2"
              sx={{
                color: darkMode ? "#d0dceb" : "#844",
                fontSize: { xs: "0.95rem", md: "0.98rem" },
                lineHeight: 1.6,
              }}
            >
              {s.details}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}
