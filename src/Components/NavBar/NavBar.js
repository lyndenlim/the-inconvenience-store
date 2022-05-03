import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <Navbar>
            <Container fluid>
                <div>
                    Ecommerce
                </div>
                <Link to="/login">
                    <div>
                        Login
                    </div>
                </Link>
            </Container>
        </Navbar>
    )
}

export default NavBar