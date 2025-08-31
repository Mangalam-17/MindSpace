import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  keyframes,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api"; // centralized axios instance

const buttonHover = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading
    try {
      // Trim inputs to remove extra spaces
      const trimmedUsername = form.username.trim();
      const trimmedPassword = form.password.trim();

      // Basic validation (optional)
      if (!trimmedUsername || !trimmedPassword) {
        setError("Username and password cannot be empty.");
        setLoading(false);
        return;
      }

      const res = await api.post("/api/auth/login", {
        username: trimmedUsername,
        password: trimmedPassword,
      });

      const data = res.data;

      if (res.status >= 200 && res.status < 300) {
        if (onLogin) onLogin(data.token, data.username);
        else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
        }
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Display backend error message if available
      if (
        err.response &&
        err.response.data &&
        typeof err.response.data.message === "string"
      ) {
        if (err.response.data.message === "Invalid credentials") {
          setError("Wrong username or password, please try again.");
        } else {
          setError(err.response.data.message);
        }
      } else {
        setError("Network error. Please try again.");
      }
    }
    setLoading(false); // End loading
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
            Login
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
              type="submit"
              disabled={loading}
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "LOGIN"
              )}
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
            Don&apos;t have an account?{" "}
            <Link
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => navigate("/register")}
              underline="none"
            >
              Register here
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
      </Box>
    </>
  );
}
