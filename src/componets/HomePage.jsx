import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const username = localStorage.getItem("username") || "User";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 2rem",
          background: "#1976d2",
          color: "#fff",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "#fff",
            position: "relative", // Needed for absolute positioning of the menu
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            {username}
          </span>
          <IconButton aria-label="open menu" onClick={() => setMenuOpen((menu) => !menu)}>
            <MenuIcon />
          </IconButton>
          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "2.5rem",
                left: 0,
                background: "#fff",
                color: "#1976d2",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                minWidth: "140px",
                zIndex: 10,
                padding: "0.5rem 0",
              }}
            >
              <div style={{ padding: "0.5rem 1rem" }}>Profile</div>
              <div style={{ padding: "0.5rem 1rem" ,textDecoration : "None"}}>          
                <a
            href="/"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              width: "100%",
            }}
            onClick={() => {
              localStorage.removeItem("username");
              localStorage.removeItem("password");
            }}
          >
            Logout
          </a></div>
            </div>
          )}
        </div>
        
<span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
           Logo
          </span>
      </header>
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          position: "relative",
          width: "100%", // Ensure flex container doesn't overflow
        }}
      >
        <aside
          style={{
            width: sidebarOpen ? "20%" : "0", // Use vw for mobile
            minWidth: sidebarOpen ? "120px" : "0",
            maxWidth: sidebarOpen ? "300px" : "0",
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
        <button
          onClick={() => setSidebarOpen((open) => !open)}
          style={{
            position: "absolute",
            left: sidebarOpen ? "clamp(120px, 20%, 300px)" : "0",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: sidebarOpen ? "0 4px 4px 0" : "4px",
            padding: "0.25rem 0.5rem",
            cursor: "pointer",
            transition: "left 0.3s, border-radius 0.3s",
          }}
        >
          {sidebarOpen ? "<" : ">"}
        </button>
        <main
          style={{
            flex: 1,
            padding: "2rem 1rem",
            minWidth: 0, // Prevent overflow
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Welcome to the Home Page</h1>
          <p style={{ fontSize: "1.1rem", color: "#555" }}>
              This is a simple home page layout with a sidebar and a header.
          </p>
        </main>
      </div>
      <footer
        style={{
          textAlign: "center",
          padding: "0.3rem 0",
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
