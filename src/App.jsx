import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./componets/LoginPage";
import HomePage from "./componets/HomePage";
import TextControl from "./componets/TextControl";
import Collabora from "./componets/Collabora";

const App = () => {
  const logo = "CRM System";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage logo={logo} />} />
        <Route path="/home" element={<HomePage logo={logo} />} />
        <Route path="/text-control" element={<TextControl />} />
        <Route path="/collabora" element={<Collabora />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
