import { Routes, Route } from "react-router-dom"
import Details from "./Components/Details/Details";
import HomePage from "./Components/HomePage/HomePage"
import Login from "./Components/Login/Login";
import NavBar from './Components/NavBar/NavBar';
import Signup from "./Components/Signup/Signup";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/items/:item" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
