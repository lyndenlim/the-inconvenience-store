import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Details from "./Components/Details/Details";
import HomePage from "./Components/HomePage/HomePage"
import Login from "./Components/Login/Login";
import NavBar from './Components/NavBar/NavBar';
import Signup from "./Components/Signup/Signup";
import Cart from "./Components/Cart/Cart";

function App() {
  const [user, setUser] = useState("")
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetch("/me")
      .then(r => {
        if (r.ok) {
          r.json()
            .then(user => setUser(user));
        }
      })
  }, [])


  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/items/:id" element={<Details setCartCount={setCartCount} setCartItems={setCartItems} cartItems={cartItems} />} />
        <Route path="/cart" element={<Cart cartCount={cartCount} cartItems={cartItems} />} />
      </Routes>
    </div>
  );
}

export default App;
