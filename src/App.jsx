import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./componets/LoginPage";
import HomePage from "./componets/HomePage";
//import HomePag from "./componets/HomePage2";
const  logo = "logo";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage logo ={logo} />} />
        <Route path="/home" element={<HomePage  logo = {logo}/>} />
        {/* <Route path="/home2" element={<HomePag />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
