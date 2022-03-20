import './App.css';
import { Routes,Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route  path="/" element={<Home />} />
      <Route  path="/Login" element={<Login />} />
      <Route  path="/Register" element={<Register />} />
    </Routes>
  );
}

export default App;
