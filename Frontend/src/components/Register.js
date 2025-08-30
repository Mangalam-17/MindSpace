import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
  Alert,
  keyframes,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api"; // centralized axios instance

const buttonHover = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/api/auth/register", form);
      const data = res.data;

      if (!res.status.toString().startsWith("2")) {
        if (data.message === "User exists") {
          setError("Username already exists.");
        } else {
          setError("Registration failed. Please try again.");
        }
        return;
      }

      setSuccessOpen(true);
      setTimeout(() => {
        setSuccessOpen(false);
        navigate("/login");
      }, 2000);

      if (onRegister) onRegister(form.username);
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        @keyframes heartMove {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(8px); }
          75% { transform: translateX(-6px); }
        }
        @keyframes animatedGradient {
          0% {background-position:0% 50%;}
          50% {background-position:100% 50%;}
          100% {background-position:0% 50%;}
        }
      `}</style>

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(-45deg, #a6c1ee, #fbc2eb, #82ccf4, #e0aaff)",
          backgroundSize: "400% 400%",
          animation: "animatedGradient 20s ease infinite",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, md: 3 },
          py: { xs: 3, md: 6 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: { xs: 2, md: 3 },
            fontWeight: 700,
            letterSpacing: 1,
            color: "#333",
            fontFamily: "Montserrat, Roboto, Arial, sans-serif",
            textAlign: "center",
            userSelect: "none",
            fontSize: { xs: "1.6rem", md: "2rem" },
            lineHeight: 1.2,
            px: { xs: 1, md: 0 },
          }}
        >
          MindSpace - AI Mental Health Support
        </Typography>

        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: { xs: 360, sm: 400 },
            p: { xs: 2.5, md: 4 },
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            position: "relative",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 1.5, md: 2 },
              color: "#1976d2",
              textAlign: "center",
              fontWeight: 600,
              userSelect: "none",
              fontSize: { xs: "1.05rem", md: "1.15rem" },
            }}
          >
            Register
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              required
              margin="normal"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "border-color 0.3s ease",
                  "&:hover fieldset": { borderColor: "#1976d2" },
                  "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "border-color 0.3s ease",
                  "&:hover fieldset": { borderColor: "#1976d2" },
                  "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                },
              }}
            />

            {error && (
              <Typography color="error" sx={{ mt: { xs: 0.5, md: 1 } }}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: { xs: 2, md: 3 },
                py: { xs: 0.9, md: 1.1 },
                fontWeight: "bold",
                fontSize: { xs: "0.95rem", md: "1rem" },
                background:
                  "linear-gradient(270deg, #4b6cb7, #182848, #4b6cb7)",
                backgroundSize: "600% 600%",
                animation: `${buttonHover} 3.5s ease infinite`,
                transition: "background-position 0.3s ease",
                "&:hover": { backgroundPosition: "100% 50%" },
              }}
              type="submit"
            >
              REGISTER
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{
              mt: { xs: 1.5, md: 2 },
              textAlign: "center",
              fontSize: { xs: "0.95rem", md: "1rem" },
            }}
          >
            Already have an account?{" "}
            <Link
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => navigate("/login")}
              underline="hover"
            >
              Login here
            </Link>
          </Typography>

          <Typography
            variant="caption"
            sx={{
              mt: { xs: 3, md: 4 },
              color: "#555",
              fontWeight: 600,
              userSelect: "none",
              textAlign: "center",
              width: "100%",
              display: "block",
              fontSize: { xs: "0.8rem", md: "0.85rem" },
            }}
          >
            Made with{" "}
            <span
              style={{
                color: "red",
                display: "inline-block",
                fontWeight: 700,
                fontSize: "1.2em",
                animation: "heartMove 1.5s infinite ease-in-out",
                verticalAlign: "middle",
                transformOrigin: "center",
              }}
            >
              ❤️
            </span>{" "}
            by Mangalam
          </Typography>
        </Paper>

        <Snackbar
          open={successOpen}
          autoHideDuration={2000}
          onClose={() => setSuccessOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Successfully registered!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
