import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

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
                <h2 className="welcome-back">Welcome Back!</h2>
                <br/>
                <form onSubmit={handleLogin}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" autoComplete="new-password" required />
                    <br />
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" autoComplete="new-password" required />
                    <br />
                    <div className="login-button-container">
                        <Button type="submit">Login</Button>
                    </div>
                </form>
                <br />
                Don't have an account? Sign up <Link to="/signup">here</Link>.
            </div>
        </div>
    )
}

export default Login