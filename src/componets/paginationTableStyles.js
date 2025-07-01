export const thStyle = {
  borderBottom: '2px solid #ddd',
  padding: '8px',
  background: '#f5f6fa',
  position: 'sticky',
  top: 0,
};

export const sortButtonStyle = (active) => ({
  marginLeft: 6,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: active ? "#1976d2" : "#888",
  fontWeight: active ? "bold" : "normal"
});

export const tdStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
  textAlign: "center"
};

export const paginationButtonStyle = (active) => ({
  margin: '0 4px',
  padding: '6px 12px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  background: active ? '#1976d2' : '#f5f6fa',
  color: active ? '#fff' : '#555',
  fontWeight: active ? 'bold' : 'normal',
  cursor: active ? 'not-allowed' : 'pointer'
});