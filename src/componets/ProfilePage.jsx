
export const ProfilePage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f6fa",
      }}
    >
      <div
        style={{
          minHeight: "300px",
          minWidth: "320px",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#87CEFA",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", color: "#1976d2" }}>Profile</h2>
        {/* Add your profile fields/info here */}
        <div style={{ color: "#333", fontSize: "1.1rem" }}>
          Username: <b>{localStorage.getItem("username") || "username"}</b>
        </div>
        <div style={{ color: "#333", fontSize: "1.1rem", marginTop: "0.5rem" }}>
          Email: <b>{localStorage.getItem("username")}@gmail.com</b>
        </div>
      </div>
    </div>
  );
};
