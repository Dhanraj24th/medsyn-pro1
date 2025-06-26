import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const SIDEBAR_WIDTH = "30%"; 
const HEADER_HEIGHT = 54;  
const FOOTER_HEIGHT = 40; 

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const username = localStorage.getItem("username") || "User";
  const [sidebarHovered, setSidebarHovered] = useState(false);

  return (
    <div style={{ minHeight: "100vh" , display: "flex", flexDirection: "column" }}>
      {/* Fixed Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left:    0,
          right: 0,
          height: HEADER_HEIGHT,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 2rem",
          background: "#1976d2",
          color: "#fff",
          transition: "left 0.3s",
          zIndex: 102,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "#fff",
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
                top: HEADER_HEIGHT,
                left: 0,
                background: "#fff",
                color: "#1976d2",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                minWidth: "140px",
                zIndex: 300,
                padding: "0.5rem 0",
              }}
            >
              <div style={{ padding: "0.5rem 1rem" }}>Profile</div>
              <div style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
                <a href="/" style={{ textDecoration: "none", color: "#1976d2" }}>Logout</a>
              </div>
            </div>
          )}
        </div>
        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          Logo
        </span>
      </header>

      {/* Fixed Sidebar */}
      <div
        style={{
          position: "fixed",
          top: HEADER_HEIGHT,
          left: 0,
          width: sidebarOpen ? `clamp(120px, ${SIDEBAR_WIDTH}, 250px)` : 0,
          height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
          background: sidebarOpen ? "#e3eafc" : "transparent",
          color: "#1976d2",
          fontWeight: "bold",
          boxSizing: "border-box",
          overflow: "hidden",
          transition: "width 0.3s, background 0.3s",
          zIndex: 100,
        }}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {sidebarOpen && (
          <ul style={{ listStyle: "none", padding: "2rem 1rem", margin: 0 }}>
            <li style={{ marginBottom: "1.5rem" }}>Dashboard</li>
            <li style={{ marginBottom: "1.5rem" }}>Profile</li>
            <li style={{ marginBottom: "1.5rem" }}>Settings</li>
          </ul>
        )}
      </div>

      {/* Sidebar Toggle Button */}
      {(sidebarHovered || !sidebarOpen) && (
        <button
          onClick={() => setSidebarOpen((open) => !open)}
          style={{
            position: "fixed",
            left: sidebarOpen ? `clamp(120px, ${SIDEBAR_WIDTH}, 250px)` : 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 200,
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "0 4px 4px 0",
            padding: "1rem 0.25rem",
            cursor: "pointer",
            transition: "left 0.3s, border-radius 0.3s",
          }}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
        >
          {sidebarOpen ? "<" : ">"}
        </button>
      )}

      {/* Main Content */}
      <main
        style={{
          position: "fixed",
          top: HEADER_HEIGHT,
          left: sidebarOpen ? `clamp(120px, ${SIDEBAR_WIDTH}, 250px)` : 0,
          right: 0,
          bottom: FOOTER_HEIGHT,
          padding: "1rem",
          overflowY: "auto",
          transition: "left 0.3s",
          background: "#fff",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Welcome to the Home Page</h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
        This is a simple home page layout with a fixed sidebar, header, and footer.
        This is a simple home page layout with a fixed sidebar, header, and footer.
        This is a simple home page layout with a fixed sidebar, header, and footer.
        This is a simple home page layout with a fixed sidebar, header, and footer.
        This is a simple home page layout with a fixed sidebar, header, and footer.
        This is a simple home page layout with a fixed sidebar, header, and footer.
        This is a simple home page layout with a fixed sidebar, header, and footer.
        This is a simple home page layout with a fixed sidebar, header, and footer.
        This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer.
        This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer. This is a simple home page layout with a fixed sidebar, header, and footer.
        </p>
      </main>
       <footer
        style={{
          position: "fixed",
          left:  0,
          right: 0,
          bottom: 0,
          height: FOOTER_HEIGHT,
          background: "#f5f6fa",
          color: "#888",
          fontSize: "0.95rem",
          fontWeight: "bold",
          textAlign: "center",
          zIndex: 100,
          lineHeight: `${FOOTER_HEIGHT}px`,
          transition: "left 0.3s",
        }}>
        &copy; {new Date().getFullYear()} footer
      </footer>
    </div>
  );
};

export default HomePage;
