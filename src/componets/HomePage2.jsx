import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const SIDEBAR_WIDTH = "clamp(120px, 30%, 250px)";
const HEADER_HEIGHT = 54;
const FOOTER_HEIGHT = 40;

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const username = localStorage.getItem("username") || "User";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: `
          "header header"
          "sidebar main"
          "footer footer"
        `,
        gridTemplateRows: `${HEADER_HEIGHT}px 1fr ${FOOTER_HEIGHT}px`,
        gridTemplateColumns: sidebarOpen ? `${SIDEBAR_WIDTH} 1fr` : `0 1fr`,
        height: "100vh",
        transition: "grid-template-columns 0.3s ease"
      }}
    >
      {/* Header */}
      <header
        style={{
          gridArea: "header",
          background: "#1976d2",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1.5rem",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {sidebarOpen && (
            <span style={{ fontWeight: "bold", fontSize: "1.1rem", marginRight: "1rem" }}>
              {username}
            </span>
          )}
          <IconButton aria-label="menu" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: HEADER_HEIGHT,
                left: sidebarOpen ? SIDEBAR_WIDTH : 0,
                background: "#fff",
                color: "#1976d2",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                minWidth: "140px",
                zIndex: 100,
                padding: "0.5rem 0",
              }}
            >
              <div style={{ padding: "0.5rem 1rem" }}>Profile</div>
              <div
                style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                <a href="/" style={{ textDecoration: "none", color: "#1976d2" }}>Logout</a>
              </div>
            </div>
          )}
        </div>
        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Logo</span>
      </header>

      {/* Sidebar */}
      <aside
        style={{
          gridArea: "sidebar",
          background: "#e3eafc",
          color: "#1976d2",
          fontWeight: "bold",
          overflow: "hidden",
          transition: "width 0.3s",
          padding: sidebarOpen ? "2rem 1rem" : "0",
        }}
      >
        {sidebarOpen && (
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li style={{ marginBottom: "1.5rem" }}>Dashboard</li>
            <li style={{ marginBottom: "1.5rem" }}>Profile</li>
            <li style={{ marginBottom: "1.5rem" }}>Settings</li>
          </ul>
        )}
      </aside>

      {/* Sidebar Toggle Button */}
      {(sidebarHovered || !sidebarOpen) && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "absolute",
            left: sidebarOpen ? SIDEBAR_WIDTH : 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 200,
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "0 4px 4px 0",
            padding: "1rem 0.25rem",
            cursor: "pointer",
          }}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
        >
          {sidebarOpen ? "<" : ">"}
        </button>
      )}

      {/* Main */}
      <main
        style={{
          gridArea: "main",
          background: "#fff",
          padding: "1rem",
          overflowY: "auto",
        }}
        onMouseEnter={() => setSidebarHovered(false)}
        onMouseLeave={() => setSidebarHovered(true)}
      >
        <h1>Welcome to the Home Page</h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          {/* Truncated for brevity */}
          This is a simple home page layout with a fixed sidebar, header, and footer. (Repeat as needed)
        </p>
      </main>

      {/* Footer */}
      <footer
        style={{
          gridArea: "footer",
          background: "#f5f6fa",
          color: "#888",
          fontSize: "0.95rem",
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: `${FOOTER_HEIGHT}px`,
        }}
      >
        &copy; {new Date().getFullYear()} footer
      </footer>
    </div>
  );
};

export default HomePage;
