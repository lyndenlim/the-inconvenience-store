import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Signup.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup({ setUser }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    function handleSignUp(e) {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                password_confirmation: confirmPassword,
            }),
        }).then(res => {
            if (res.ok) {
                res.json()
                    .then(user => {
                        setUser(user)
                        navigate("/homepage")
                    })
            } else {
                res.json()
                    .then(error => {
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
        <div className="signup-container">
            <div>
                <h2 className="lets-get-started">Let's Get Started</h2>
                <br />
                <form onSubmit={handleSignUp}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" autoComplete="new-password" required />
                    <br />
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" autoComplete="new-password" required />
                    <br />
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" type="password" autoComplete="new-password" required />
                    <br />
                    <div className="signup-button-container">
                        <Button type="submit">Sign Up </Button>
                    </div>
                </form>
                <br />
                Already have an account? <Link to="/">Login</Link>.
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

export default Signup