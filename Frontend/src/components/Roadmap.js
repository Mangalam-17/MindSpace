import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Checkbox,
  Button,
  Snackbar,
  LinearProgress,
  Grid,
  CircularProgress,
} from "@mui/material";
import { api } from "../lib/api";

const reminderTimes = ["Daily", "Every 3 days", "Weekly", "No Reminder"];

export default function Roadmap({ token }) {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingIds, setUpdatingIds] = useState([]); // Track which step IDs are updating
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [reminders, setReminders] = useState({}); // { stepId: reminderTime }

  useEffect(() => {
    fetchRoadmap();
  }, [token]);

  const fetchRoadmap = () => {
    setLoading(true);
    api
      .get("/api/roadmap", { headers: { "x-auth-token": token } })
      .then((res) => {
        setRoadmap(res.data.slice(0, 10));
      })
      .catch(() => {
        setRoadmap([]);
        setSnackbarMsg("Failed to fetch roadmap. Try again.");
        setSnackbarOpen(true);
      })
      .finally(() => setLoading(false));
  };

  const toggleComplete = (idx) => {
    const step = roadmap[idx];
    if (!step || !step._id) return;

    // Optimistically update UI
    const newRoadmap = [...roadmap];
    newRoadmap[idx].completed = !step.completed;
    setRoadmap(newRoadmap);

    // Mark step as updating
    setUpdatingIds((prev) => [...prev, step._id]);

    api
      .put(
        `/api/roadmap/${step._id}`,
        { completed: newRoadmap[idx].completed },
        { headers: { "x-auth-token": token } }
      )
      .then(() => {
        // Success - nothing to do, UI already updated
      })
      .catch(() => {
        // Revert on failure
        newRoadmap[idx].completed = step.completed;
        setRoadmap(newRoadmap);
        setSnackbarMsg("Failed to update roadmap step. Try again.");
        setSnackbarOpen(true);
      })
      .finally(() => {
        // Remove updating flag
        setUpdatingIds((prev) => prev.filter((id) => id !== step._id));
      });
  };

  const handleReminderChange = (stepId, time) => {
    setReminders((prev) => ({ ...prev, [stepId]: time }));
    alert(`Reminder set to '${time}' for the step.`);
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#232531" : "#fff6f0",
      }}
      elevation={0}
    >
      <Typography
        variant="h5"
        sx={{
          mb: { xs: 1.5, md: 2.5 },
          fontWeight: 700,
          color: (theme) =>
            theme.palette.mode === "dark" ? "#eaf6ff" : "#4a251a",
          fontSize: { xs: "1.15rem", md: "1.35rem" },
        }}
      >
        Your Mental Health Roadmap
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {roadmap.map((step, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={step._id}>
              <Card
                sx={{
                  p: { xs: 1, md: 1 },
                  height: "100%",
                  borderRadius: 2,
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 6px 18px rgba(0,0,0,0.35)"
                      : "0 6px 18px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: { xs: "1.05rem", md: "1.15rem" } }}
                  >
                    {step.step}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: { xs: 1, md: 1.25 },
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Checkbox
                      checked={step.completed}
                      onChange={() => toggleComplete(idx)}
                      disabled={updatingIds.includes(step._id)}
                      sx={{ p: { xs: 0.5, md: 1 } }}
                    />
                    {updatingIds.includes(step._id) && (
                      <CircularProgress size={20} />
                    )}
                    <Typography
                      sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
                    >
                      {step.completed ? "Completed" : "Not completed"}
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={step.completed ? 100 : 0}
                    sx={{
                      mb: { xs: 1.5, md: 2 },
                      height: { xs: 8, md: 10 },
                      borderRadius: 5,
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "#394151" : "#ffe5e9",
                    }}
                  />

                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{ fontSize: { xs: "0.92rem", md: "0.98rem" } }}
                  >
                    Set Reminder:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {reminderTimes.map((time) => (
                      <Button
                        key={time}
                        variant={
                          reminders[step._id] === time
                            ? "contained"
                            : "outlined"
                        }
                        size="small"
                        onClick={() => handleReminderChange(step._id, time)}
                        sx={{
                          px: { xs: 1, md: 1.25 },
                          py: { xs: 0.4, md: 0.6 },
                          minHeight: 32,
                          textTransform: "none",
                          fontWeight: 700,
                        }}
                      >
                        {time}
                      </Button>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        autoHideDuration={3000}
      />
    </Paper>
  );
}
