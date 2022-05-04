import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { Link, useLocation } from "react-router-dom"

function NavBar() {
    const location = useLocation()

    return (
        <Navbar>
            <Container fluid>
                <Link to="/homepage">
                    <div>
                        The Inconvienence Store
                    </div>
                </Link>
                <Link to={location.pathname === "/" ? "/signup" : "/"}>
                    <div>
                        {location.pathname === "/" ? "Sign Up" : "Login"}
                    </div>
                </Link>
            </Container>
        </Navbar>
    )
}

export default NavBar