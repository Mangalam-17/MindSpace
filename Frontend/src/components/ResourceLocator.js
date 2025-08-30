import React, { useMemo, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import BuildIcon from "@mui/icons-material/Build";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MapIcon from "@mui/icons-material/Map";

// Front-end dummy resources (now 9 items)
const DUMMY = [
  {
    id: 1,
    type: "Clinic",
    name: "Downtown Therapist Clinic",
    address: "123 Main St, Midtown",
    lat: 40.7128,
    lng: -74.006,
    desc: "Licensed therapists offering CBT and mindfulness-based therapy.",
    website: "https://example.com/clinic",
  },
  {
    id: 2,
    type: "Support",
    name: "City Wellness Group",
    address: "456 Elm St, Riverpark",
    lat: 40.7138,
    lng: -74.002,
    desc: "Weekly peer-led support circle for stress and burnout.",
    website: "https://example.com/support",
  },
  {
    id: 3,
    type: "Event",
    name: "Weekly Meditation Meetup",
    address: "789 Oak Ave, Oldtown",
    lat: 40.71,
    lng: -74.01,
    desc: "Free guided meditation and breathwork, every Saturday 9 AM.",
    website: "https://example.com/meditation",
  },
  {
    id: 4,
    type: "Article",
    name: "How to Journal for Mental Clarity",
    address: "Online resource",
    lat: null,
    lng: null,
    desc: "A practical guide to reflective journaling and prompts.",
    website: "https://example.com/article",
  },
  {
    id: 5,
    type: "Video",
    name: "10-Minute Box Breathing",
    address: "Online video",
    lat: null,
    lng: null,
    desc: "Follow-along breathing routine to calm the nervous system.",
    website: "https://example.com/video",
  },
  {
    id: 6,
    type: "Tool",
    name: "Mood & Habit Tracker",
    address: "Web app",
    lat: null,
    lng: null,
    desc: "Track mood, habits, and triggers with daily check-ins.",
    website: "https://example.com/tool",
  },
  {
    id: 7,
    type: "Contact",
    name: "24/7 Mental Health Helpline",
    address: "Toll-free: 1-800-000-000",
    lat: null,
    lng: null,
    desc: "Immediate support and crisis counseling, available anytime.",
    website: "tel:1800000000",
  },
  {
    id: 8,
    type: "Clinic",
    name: "Harborview Wellness Center",
    address: "22 Bay Rd, Harbor",
    lat: 40.718,
    lng: -74.015,
    desc: "Integrated care: therapy, nutrition, and stress clinics.",
    website: "https://example.com/harborview",
  },
  {
    id: 9,
    type: "Event",
    name: "Mindful Walking in the Park",
    address: "Central Park East Gate",
    lat: 40.785091,
    lng: -73.968285,
    desc: "45-minute mindful walk with grounding techniques (Sun 7 AM).",
    website: "https://example.com/walk",
  },
];

const TYPES = [
  { label: "All", value: "All" },
  { label: "Clinic", value: "Clinic", icon: <LocalHospitalIcon /> },
  { label: "Event", value: "Event", icon: <EventIcon /> },
  { label: "Support", value: "Support", icon: <GroupIcon /> },
  { label: "Article", value: "Article", icon: <ArticleIcon /> },
  { label: "Video", value: "Video", icon: <VideoLibraryIcon /> },
  { label: "Tool", value: "Tool", icon: <BuildIcon /> },
  { label: "Contact", value: "Contact", icon: <ContactPhoneIcon /> },
];

function typeIcon(type) {
  switch (type) {
    case "Clinic":
      return <LocalHospitalIcon />;
    case "Event":
      return <EventIcon />;
    case "Support":
      return <GroupIcon />;
    case "Article":
      return <ArticleIcon />;
    case "Video":
      return <VideoLibraryIcon />;
    case "Tool":
      return <BuildIcon />;
    case "Contact":
      return <ContactPhoneIcon />;
    default:
      return null;
  }
}

export default function ResourceLocator({ darkMode }) {
  const [activeType, setActiveType] = useState("All");
  const [query, setQuery] = useState("");

  // Color tokens
  const colors = {
    pageBg: darkMode ? "#232531" : "#fff6f0",
    cardBg: darkMode ? "#1f2230" : "#ffffff",
    border: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)",
    heading: darkMode ? "#eaf6ff" : "#2f1f1a",
    subtext: darkMode ? "#c9d3e0" : "#4f3a33",
    accent: darkMode ? "#54ebff" : "#9c462d",
    chipText: "#243447",
    icon: darkMode ? "#8ffefc" : "#7a3325",
    link: darkMode ? "#9fdcff" : "#174ea6",
    visitBg: darkMode ? "#54ebff" : "#9c462d",
    visitText: darkMode ? "#13202f" : "#ffffff",
    mapsText: darkMode ? "#9fdcff" : "#174ea6",
    mapsBorder: darkMode ? "rgba(159,220,255,0.35)" : "rgba(23,78,166,0.45)",
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DUMMY.filter((r) => {
      const matchesType = activeType === "All" ? true : r.type === activeType;
      const matchesQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q);
      return matchesType && matchesQ;
    });
  }, [activeType, query]);

  return (
    <Paper
      sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, bgcolor: colors.pageBg }}
      elevation={0}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: colors.heading,
          mb: { xs: 1.5, md: 2 },
          fontSize: { xs: "1.15rem", md: "1.35rem" },
        }}
      >
        Curated Resources
      </Typography>

      {/* Controls */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 1.5 },
          alignItems: "center",
          justifyContent: "space-between",
          mb: { xs: 2, md: 3 },
        }}
      >
        <Tabs
          value={activeType}
          onChange={(_, v) => setActiveType(v)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            minHeight: 42,
            "& .MuiTab-root": {
              minHeight: 42,
              textTransform: "none",
              fontWeight: 700,
              color: colors.subtext,
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              px: { xs: 1, sm: 1.5, md: 2 },
            },
            "& .Mui-selected": { color: colors.accent },
            "& .MuiTabs-indicator": {
              background: colors.accent,
              height: 3,
              borderRadius: 2,
            },
          }}
        >
          {TYPES.map((t) => (
            <Tab
              key={t.value}
              value={t.value}
              iconPosition="start"
              icon={t.icon || null}
              label={t.label}
            />
          ))}
        </Tabs>

        <TextField
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, address, or description"
          sx={{
            minWidth: { xs: "100%", sm: 300 },
            maxWidth: { xs: "100%", sm: 420 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: colors.subtext }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Cards grid */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {filtered.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 3,
                bgcolor: colors.cardBg,
                border: `1px solid ${colors.border}`,
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: darkMode
                    ? "0 10px 26px rgba(0,0,0,0.35)"
                    : "0 10px 26px rgba(156,70,45,0.18)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 }, pb: { xs: 1.5, md: 2 } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                    gap: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: colors.accent,
                      color: colors.chipText,
                      width: 30,
                      height: 30,
                    }}
                  >
                    {typeIcon(item.type)}
                  </Avatar>
                  <Chip
                    label={item.type}
                    size="small"
                    sx={{
                      bgcolor: darkMode
                        ? "rgba(84,235,255,0.15)"
                        : "rgba(156,70,45,0.08)",
                      color: colors.accent,
                      fontWeight: 700,
                    }}
                  />
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: colors.heading,
                    fontSize: { xs: "1.05rem", md: "1.1rem" },
                  }}
                >
                  {item.name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 0.75,
                    mb: 1,
                    gap: 0.75,
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: 18, color: colors.icon }} />
                  <Typography variant="body2" sx={{ color: colors.subtext }}>
                    {item.address}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{ color: colors.subtext, lineHeight: 1.55 }}
                >
                  {item.desc}
                </Typography>
              </CardContent>

              <CardActions
                sx={{
                  mt: "auto",
                  px: { xs: 1.5, md: 2 },
                  pb: { xs: 1.5, md: 2 },
                  pt: 0.5,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* Open in Maps / Link */}
                <Button
                  size="small"
                  variant="text"
                  component={Link}
                  href={
                    item.lat != null && item.lng != null
                      ? `https://maps.google.com/?q=${item.lat},${item.lng}`
                      : item.website
                  }
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  startIcon={<MapIcon />}
                  sx={{
                    fontWeight: 800,
                    textTransform: "none",
                    color: colors.mapsText,
                    border: `1px solid ${colors.mapsBorder}`,
                    borderRadius: 2,
                    px: { xs: 1, md: 1.25 },
                    "& .MuiSvgIcon-root": { color: colors.mapsText },
                    "&:hover": {
                      backgroundColor: darkMode
                        ? "rgba(159,220,255,0.08)"
                        : "rgba(23,78,166,0.08)",
                      borderColor: darkMode
                        ? "rgba(159,220,255,0.55)"
                        : "rgba(23,78,166,0.7)",
                    },
                  }}
                >
                  {item.lat != null ? "OPEN IN MAPS" : "OPEN LINK"}
                </Button>

                {/* Visit */}
                <Button
                  size="small"
                  variant="contained"
                  component={Link}
                  href={item.website}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  sx={{
                    textTransform: "none",
                    fontWeight: 900,
                    px: { xs: 1.25, md: 1.5 },
                    borderRadius: 2,
                    bgcolor: colors.visitBg,
                    color: colors.visitText,
                    boxShadow: darkMode
                      ? "0 2px 10px rgba(84,235,255,0.25)"
                      : "0 2px 10px rgba(156,70,45,0.25)",
                    "&:hover": {
                      bgcolor: darkMode ? "#5df1ff" : "#863b27",
                      color: colors.visitText,
                      boxShadow: darkMode
                        ? "0 4px 16px rgba(84,235,255,0.35)"
                        : "0 4px 16px rgba(156,70,45,0.35)",
                    },
                    "& .MuiSvgIcon-root": { color: colors.visitText },
                  }}
                >
                  Visit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                textAlign: "center",
                borderRadius: 3,
                bgcolor: colors.cardBg,
                border: `1px dashed ${colors.border}`,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: colors.heading,
                  mb: 1,
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                }}
              >
                No matching resources
              </Typography>
              <Typography sx={{ color: colors.subtext }}>
                Try a different category or search term.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
