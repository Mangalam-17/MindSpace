import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <IconButton
      color="inherit"
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={Boolean(darkMode)}
      sx={{
        p: { xs: 0.75, md: 1 },
        "& .MuiSvgIcon-root": {
          fontSize: { xs: 22, md: 24 },
        },
      }}
    >
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
