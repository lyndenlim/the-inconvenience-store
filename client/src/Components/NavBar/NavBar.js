import 'bootstrap/dist/css/bootstrap.min.css';
import "./NavBar.css"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Badge from "@mui/material/Badge"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useEffect } from 'react';
import axios from 'axios';

function NavBar({ user, setUser, setCartCount, cartCount }) {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        async function getCart() {
            const data = await axios.get(`/users/${user.id}`)
            setCartCount(data.data.carts.map(cart => cart.quantity).reduce((prev, current) => prev + current))
        }

        getCart()
    }, [])

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        }).then((r) => {
            if (r.ok) {
                setUser(null)
                navigate("/")
            }
        });
    }

    return (
        <Navbar>
            <Container fluid>
                <Link className="link" to="/homepage">
                    <div>
                        The Inconvienence Store
                    </div>
                </Link>
                {!user ?
                    <Link className="link" to={location.pathname === "/" ? "/signup" : "/"}>
                        <div>
                            {location.pathname === "/" ? "Sign Up" : "Login"}
                        </div>
                    </Link>
                    :
                    <div>
                        <button onClick={() => navigate("/cart")} className="cart-button">
                            <Badge color="error" badgeContent={cartCount} >
                                <ShoppingCartIcon />{" "}
                            </Badge>
                        </button>
                        <button onClick={() => navigate("/account")} className="account-button">Account</button>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>}
            </Container>
        </Navbar>
    )
}

export default NavBar