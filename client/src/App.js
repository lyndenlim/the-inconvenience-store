import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Details from "./Components/Details/Details";
import HomePage from "./Components/HomePage/HomePage"
import Login from "./Components/Login/Login";
import NavBar from './Components/NavBar/NavBar';
import Signup from "./Components/Signup/Signup";
import Cart from "./Components/Cart/Cart";
import AccountPage from "./Components/AccountPage/AccountPage";
import CheckoutPage from "./Components/CheckoutPage/CheckoutPage";
import OrderConfirmation from "./Components/OrderConfirmation/OrderConfirmation";

function App() {
  const [user, setUser] = useState("")
  const [cartCount, setCartCount] = useState(0)
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    fetch("/me")
      .then(r => {
        if (r.ok) {
          r.json()
            .then(user => setUser(user));
        }
      })
  }, [cartCount])


  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} setCartCount={setCartCount} cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/items/:id" element={<Details user={user} setCartCount={setCartCount} />} />
        <Route path="/cart" element={<Cart user={user} cartCount={cartCount} setCartCount={setCartCount} />} />
        <Route path="/account" element={<AccountPage user={user} />} />
        <Route path="/checkout" element={<CheckoutPage user={user} setCartCount={setCartCount} orderNumber={orderNumber} setOrderNumber={setOrderNumber} />} />
        <Route path="/success" element={<OrderConfirmation user={user} orderNumber={orderNumber} />} />
      </Routes>
    </div>
  );
}

export default App;
