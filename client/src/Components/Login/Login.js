import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        }).then(res => {
            if (res.ok) {
                res.json().then((user) => {
                    setUser(user)
                    navigate("/homepage")
                });
            } else {
                res.json().then(error => {
                    toast.error(error.errors[0], {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                })
            }
        })
    }

    return (
        <div className="login-container">
            <div>
                <h2 className="welcome-back">Welcome Back!</h2>
                <br />
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
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </div>
    )
}

export default Login