import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function Login({ setUser }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                    navigate("/homepage")
                });
            } else {
                alert("error")
                //   r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <div className="login-container">
            <div>
                <h2>Welcome Back!</h2>
                <form onSubmit={handleLogin}>
                    Email
                    <input onChange={e => setEmail(e.target.value)} placeholder="email" type="email" autoComplete="new-password" required />
                    <br />
                    Password
                    <input onChange={e => setPassword(e.target.value)} placeholder="password" type="password" autoComplete="new-password" required />
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