import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./componets/LoginPage";
import HomePage from "./componets/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
