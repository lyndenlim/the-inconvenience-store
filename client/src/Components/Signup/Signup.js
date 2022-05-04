import { Link } from "react-router-dom"
import "./Signup.css"

function Signup() {
    return (
        <div className="signup-container">
            <div>
                <h2>Sign up</h2>
                <form>
                    Email
                    <input placeholder="email" autoComplete="new-password" required />
                    <br />
                    Password
                    <input placeholder="password" type="password" autoComplete="new-password" required />
                    <br />
                    <br />
                    <button type="submit">Sign up </button>
                </form>
                Already have an account? <Link to="/">Login</Link>.
            </div>
        </div>
    )
}

export default Signup