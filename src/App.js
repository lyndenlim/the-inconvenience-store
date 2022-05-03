import './App.css';
import { Routes, Route } from "react-router-dom"
import HomePage from "../src/Components/HomePage/HomePage"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" component={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
