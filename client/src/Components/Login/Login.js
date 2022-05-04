import "./Login.css"
import { Link } from "react-router-dom"

function Login() {
    return (
        <div className="login-container">
            <div>
                <h2>Login</h2>
                <form>
                    Email
                    <input placeholder="email" autoComplete="new-password" required />
                    <br />
                    Password
                    <input placeholder="password" type="password" autoComplete="new-password" required />
                    <br />
                    <br />
                    <button type="submit">Login</button>
                </form>
                Don't have an account? Sign up <Link to="/signup">here</Link>.
            </div>
        </div>
    )
}

export default Login