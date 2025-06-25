import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const username = localStorage.getItem("username") || "User";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 2rem",
          background: "#1976d2",
          color: "#fff",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{username}</span>
        <IconButton><MenuIcon></MenuIcon></IconButton>
        <nav>
          <a
            href="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              marginLeft: "1rem",
              fontWeight: "bold",
            }}
          >
            Logo
          </a>
        </nav>
      </header>
      <div style={{ display: "flex", flex: 1, minHeight: 0, position: "relative" }}>
   <aside
    style={{
      width: sidebarOpen ? "200px" : "0",
      background: sidebarOpen ? "#e3eafc" : "transparent",
      padding: sidebarOpen ? "2rem 1rem" : "0",
      color: "#1976d2",
      fontWeight: "bold",
      boxSizing: "border-box",
      overflow: "hidden",
      transition: "width 0.3s, padding 0.3s, background 0.3s",
      position: "relative",
    }}
  >
    {sidebarOpen && (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ marginBottom: "1.5rem" }}>Dashboard</li>
        <li style={{ marginBottom: "1.5rem" }}>Profile</li>
        <li style={{ marginBottom: "1.5rem" }}>Settings</li>
      </ul>
    )}
   </aside>

  {/* Toggle Button (outside aside) */}
   <button
    onClick={() => setSidebarOpen((open) => !open)}
    style={{
      position: "absolute",
      left: sidebarOpen ? "200px" : "0",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      background: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: "0 4px 4px 0",
      padding: "4px 8px",
      cursor: "pointer",
      transition: "left 0.3s",
    }}
  >
    {sidebarOpen ? "<" : ">"}
   </button>
        <main style={{ flex: 1, padding: "2rem", minWidth: 0 }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Welcome to the Home Page</h1>
            <p style={{ fontSize: "1.1rem", color: "#555" }}>
                This is a simple home page layout with a sidebar and a header.
            </p>
        </main>
</div>

      <footer
        style={{
          textAlign: "center",
          padding: "1rem 0",
          background: "#f5f6fa",
          color: "#888",
          fontSize: "0.95rem",
          fontWeight: "bold",
        }}
      >
        &copy; {new Date().getFullYear()} footer
      </footer>
    </div>
  );
};

export default HomePage;
