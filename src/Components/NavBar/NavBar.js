import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { Link, useLocation } from "react-router-dom"

function NavBar() {
    const location = useLocation()

    return (
        <Navbar>
            <Container fluid>
                <Link to="/">
                    <div>
                        Ecommerce
                    </div>
                </Link>
                <Link to="/login">
                    <div>
                        {location.pathname === "/login" ? "Sign Up" : "Login"}
                    </div>
                </Link>
            </Container>
        </Navbar>
    )
}

export default NavBar