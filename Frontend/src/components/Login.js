import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Login Page Debug</h1>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
