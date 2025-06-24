import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem(`username`, username);
      localStorage.setItem("password", password);
      navigate("/home");
    }
  };

  return (
    <div
      style={{
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f6fa",
  }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
            logo
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            width: "100%",
            maxWidth: "350px",
            minWidth: "0",
            margin: "0 16px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            alignItems: "center",
            boxSizing: "border-box", // Add here
          }}
        >
          <h3 style={{ textAlign: "center", margin: 0 }}>Login</h3>
   <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "0.5rem" }}>
            <label htmlFor="username" style={{ minWidth: "80px" }}>Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: "0.7rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                width: "100%",
              }}
              required
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "0.5rem" }}>
            <label htmlFor="password" style={{ minWidth: "80px" }}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "0.7rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                width: "100%",
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "12px",
              alignSelf: "flex-end",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(25, 118, 210, 0.15)",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;