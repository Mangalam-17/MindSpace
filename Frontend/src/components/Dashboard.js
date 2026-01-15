import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
  Paper,
  Divider,
  keyframes,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MoodTracker from "./MoodTracker";
import CreativeTherapy from "./CreativeTherapy";
import SupportCircle from "./SupportCircle";
import Roadmap from "./Roadmap";
import InsightReports from "./InsightReports";
import ResourceLocator from "./ResourceLocator";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;
const pulseScale = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
`;

function DevelopmentReminder({ darkMode }) {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: { xs: 1.25, md: 1.5 },
        minWidth: 280,
        maxWidth: 900,
        borderRadius: 3,
        bgcolor: darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
        border: darkMode
          ? "1px solid rgba(255, 255, 255, 0.12)"
          : "1px solid rgba(0, 0, 0, 0.1)",
        color: darkMode ? "#ccc" : "#444",
        textAlign: "center",
        fontWeight: 600,
        fontSize: { xs: "0.95rem", md: "1rem" },
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        mx: "auto",
        mt: { xs: 3, md: 4 },
        animation: `${pulseScale} 3.5s ease-in-out infinite`,
      }}
    >
      <Typography
        component="span"
        aria-hidden="true"
        sx={{
          fontSize: { xs: "1.35rem", md: "1.5rem" },
          color: darkMode ? "#bbb" : "#666",
          animation: `${float} 3.5s ease-in-out infinite`,
          display: "inline-block",
        }}
      >
        🛠️
      </Typography>
      <Typography>
        This website is under development, new features coming soon...
      </Typography>
    </Box>
  );
}

export default function Dashboard({
  token: propToken,
  username: propUsername,
  onLogout,
  setUserMood,
}) {
  const token = propToken || localStorage.getItem("token");
  const username = propUsername || localStorage.getItem("username");
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  const initialTab = Number(localStorage.getItem("dashboardTabIndex")) || 0;
  const [tabIndex, setTabIndex] = useState(initialTab);

  const handleTabChange = (e, val) => {
    setTabIndex(val);
    localStorage.setItem("dashboardTabIndex", val);
  };

  const [moodUpdatedAt, setMoodUpdatedAt] = useState(Date.now());

  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id || null;
    } catch {
      userId = null;
    }
  }

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleMoodForTheme = (mood) => {
    if (setUserMood) setUserMood(mood);
    setMoodUpdatedAt(Date.now());
  };

  const getTabPanelBg = () => (darkMode ? "#242730" : "#ffebe6");
  const getTopBarBg = () => (darkMode ? "#191b1f" : "#ffb6a6");

  const tabs = [
    {
      label: "Mood Tracker",
      component: (
        <MoodTracker
          token={token}
          onMoodChange={handleMoodForTheme}
          darkMode={darkMode}
        />
      ),
    },
    { label: "Creative Therapy", component: <CreativeTherapy token={token} /> },
    {
      label: "Support Circles",
      component: <SupportCircle token={token} userId={userId} />,
    },
    { label: "Roadmap", component: <Roadmap token={token} /> },
    {
      label: "Insight Reports",
      component: (
        <InsightReports
          token={token}
          moodUpdatedAt={moodUpdatedAt}
          darkMode={darkMode}
        />
      ),
    },
    { label: "Resources", component: <ResourceLocator darkMode={darkMode} /> },
  ];

  if (!token || !username) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography>You must be logged in to view the dashboard.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: darkMode ? "#121212" : "#ffeaea",
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 0 },
        transition: "background 0.3s",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: { xs: 980, md: 1050 },
          mx: "auto",
          borderRadius: { xs: 3, md: 4 },
          overflow: "hidden",
          bgcolor: darkMode ? "#1a1c21" : "#fff",
          boxShadow: darkMode
            ? "0 6px 24px rgba(20,24,31,0.42)"
            : "0 6px 24px rgba(255,182,166,0.22)",
          transition: "background 0.3s",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        {/* Top bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1, sm: 2 },
            flexWrap: "wrap",
            bgcolor: getTopBarBg(),
            px: { xs: 2, md: 4 },
            py: { xs: 1, md: 2 },
            borderBottom: `1px solid ${darkMode ? "#282c34" : "#fac7be"}`,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: darkMode ? "#f0a679" : "#4a251a",
              fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.35rem" },
              letterSpacing: { xs: "0.6px", md: "1px" },
              lineHeight: 1.2,
            }}
          >
            MindSpace - Personalized Mental Health Support
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.5, md: 2 },
              flexWrap: "wrap",
            }}
          >
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              sx={{
                background: darkMode
                  ? "linear-gradient(135deg, #232732 60%, #413e52 100%)"
                  : "linear-gradient(135deg, #ffecec 60%, #fac7be 100%)",
                boxShadow: darkMode ? "0 1px 8px #3d374f" : "0 1px 8px #fac7be",
                color: darkMode ? "#f0a679" : "#ba3b1e",
                p: { xs: 0.75, md: 1 },
              }}
              aria-label="toggle theme"
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Typography
              sx={{
                color: darkMode ? "#eee" : "#4a251a",
                fontWeight: 600,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              {username}
            </Typography>
            <Button
              onClick={onLogout}
              variant="outlined"
              sx={{
                borderColor: darkMode ? "#f26363" : "#ba3b1e",
                color: darkMode ? "#f26363" : "#ba3b1e",
                fontWeight: 700,
                ml: { xs: 0, md: 2 },
                px: { xs: 1.25, md: 2 },
                py: { xs: 0.5, md: 0.75 },
                minHeight: 36,
                "&:hover": {
                  background: darkMode ? "#232732" : "#fff4f4",
                  borderColor: darkMode ? "#ff8585" : "#d96b2f",
                  color: "#fff",
                },
              }}
            >
              LOGOUT
            </Button>
          </Box>
        </Box>

        {/* Tabs navigation */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          TabScrollButtonProps={{
            sx: {
              color: darkMode ? "#f26363" : "#ba3b1e",
              background: darkMode
                ? "linear-gradient(135deg, #232732 60%, #413e52 100%)"
                : "linear-gradient(135deg, #ffecec 60%, #fac7be 100%)",
              border: `1px solid ${darkMode ? "#f26363" : "#ba3b1e"}`,
              borderRadius: 2,
              boxShadow: darkMode ? "0 1px 8px #3d374f" : "0 1px 8px #fac7be",
              fontWeight: 700,
              "&:hover": {
                background: darkMode ? "#232732" : "#fff4f4",
                borderColor: darkMode ? "#ff8585" : "#d96b2f",
                color: darkMode ? "#fff" : "#ba3b1e",
                boxShadow: darkMode
                  ? "0 1px 12px #f2636360"
                  : "0 1px 12px #ffd4c4",
              },
            },
          }}
          sx={{
            backgroundColor: darkMode ? "#21232d" : "#ffecea",
            borderBottom: 1,
            borderColor: darkMode ? "#32344c" : "#f8b4a1",
            px: { xs: 1, md: 2 },
            "& .MuiTabs-indicator": {
              backgroundColor: darkMode ? "#f26363" : "#dd4f3d",
              height: 3,
              borderRadius: 2,
            },
            "& .MuiTab-root": {
              color: darkMode ? "#b0b2be" : "#7a3f2b",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              fontSize: { xs: "0.85rem", sm: "0.92rem", md: "0.99rem" },
              px: { xs: 1, sm: 1.5, md: 2 },
              py: { xs: 0.9, md: 1.3 },
              minHeight: 40,
            },
            "& .Mui-selected": {
              color: darkMode ? "#f26363" : "#9c462d",
              textShadow: darkMode ? "0 1px 8px #3d374f" : "none",
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
        <Divider
          sx={{ bgcolor: darkMode ? "#232732" : "#fac7be", height: 2 }}
        />

        {/* Active tab content */}
        <Box
          sx={{
            flexGrow: 1,
            minHeight: 0,
            bgcolor: getTabPanelBg(),
            borderRadius: { xs: 0, md: 2 },
            p: { xs: 2, md: 3 },
            overflowY: "auto",
            transition: "background 0.3s",
          }}
        >
          {tabs[tabIndex].component}
        </Box>
      </Paper>

      {/* Development Reminder */}
      <DevelopmentReminder darkMode={darkMode} />
    </Box>
  );
}
