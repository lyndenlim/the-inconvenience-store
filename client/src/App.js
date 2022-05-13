import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Details from "./Components/Details/Details";
import HomePage from "./Components/HomePage/HomePage"
import Login from "./Components/Login/Login";
import NavBar from './Components/NavBar/NavBar';
import Cart from "./Components/Cart/Cart";
import AccountPage from "./Components/AccountPage/AccountPage";
import CheckoutPage from "./Components/CheckoutPage/CheckoutPage";
import OrderSummary from "./Components/OrderSummary/OrderSummary";
import { UserContext } from "./Components/UserContext/UserContext";
import axios from "axios";

function App() {
  const [user, setUser] = useState("")
  const [cartCount, setCartCount] = useState(0)
  const [orderNumber, setOrderNumber] = useState("")
  const [orderDetails, setOrderDetails] = useState([])

  useEffect(() => {
    async function setCurrentUserData() {
      axios.get("/me")
        .then(res => {
          setUser(res.data)
        })
    }

    setCurrentUserData()
  }, [cartCount])

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser, cartCount, setCartCount, orderNumber, setOrderNumber, orderDetails, setOrderDetails }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/items/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
