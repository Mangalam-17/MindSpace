import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { api } from "./lib/api"; // centralized axios instance

const moodThemes = {
  // ... same as before ...
  default: {
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      background: { default: "#ffffff" },
    },
  },
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [userMood, setUserMood] = useState(
    localStorage.getItem("userMood") || "default"
  );

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("userMood", userMood);
  }, [userMood]);

  const theme = useMemo(
    () => createTheme(moodThemes[userMood] || moodThemes.default),
    [userMood]
  );

  const handleLogin = (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem("token", newToken);
    localStorage.setItem("username", newUsername);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setToken("");
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) return;
    api
      .get("/api/moods", { headers: { "x-auth-token": token } })
      .then((res) => {
        if (res.data.length > 0) setUserMood(res.data[0].mood.toLowerCase());
      })
      .catch(() => {});
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/login"
          element={
            !token ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? (
              <Dashboard
                token={localStorage.getItem("token")}
                username={localStorage.getItem("username")}
                onLogout={handleLogout}
                setUserMood={setUserMood}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
