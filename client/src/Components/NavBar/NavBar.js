import 'bootstrap/dist/css/bootstrap.min.css';
import "./NavBar.css"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { Link, useNavigate } from "react-router-dom"
import Badge from "@mui/material/Badge"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShop } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../../Components/UserContext/UserContext"

function NavBar() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const { setUser } = useContext(UserContext)
    const { cartCount } = useContext(UserContext)
    const { setCartCount } = useContext(UserContext)

    useEffect(() => {
        async function getCart() {
            const data = await axios.get(`/users/${user.id}`)
            if (data.data.carts.length > 0) {
                setCartCount(data.data.carts.map(cart => cart.quantity).reduce((prev, current) => prev + current))
            }

        }

        getCart()
    }, [user])

    function handleLogout() {
        axios.delete("/logout")
            .then(res => {
                if (res.status === 204) {
                    setUser(null)
                    setCartCount(0)
                    navigate("/")
                }
            });
    }

    return (
        <Navbar>
            <Container fluid>
                {user ? <Link className="link" to="/homepage">
                    <div className="logo">
                        <span><FontAwesomeIcon icon={faShop} /> The Inconvienence Store</span>
                    </div>
                </Link> :
                    <div className="logo-disabled">
                        <span><FontAwesomeIcon icon={faShop} /> The Inconvienence Store</span>
                    </div>}
                {!user ?
                    null
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