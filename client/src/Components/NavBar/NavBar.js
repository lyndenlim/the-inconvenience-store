import 'bootstrap/dist/css/bootstrap.min.css';
import "./NavBar.css"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { Link, useNavigate, useLocation } from "react-router-dom"

function NavBar({ user, setUser }) {
    const location = useLocation()
    const navigate = useNavigate()

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
                <Link to="/homepage">
                    <div>
                        The Inconvienence Store
                    </div>
                </Link>
                {!user ?
                    <Link to={location.pathname === "/" ? "/signup" : "/"}>
                        <div>
                            {location.pathname === "/" ? "Sign Up" : "Login"}
                        </div>
                    </Link>
                    :
                    <div>
                        <button className="account-button">Account</button>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>}
            </Container>
        </Navbar>
    )
}

export default NavBar