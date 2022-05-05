import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Signup.css"

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
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                    navigate("/homepage")
                })
            } else {
                alert("error")
                // r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <div className="signup-container">
            <div>
                <h2>Sign up</h2>
                <form onSubmit={handleSignUp}>
                    Email
                    <input onChange={(e) => setEmail(e.target.value)} placeholder="email" type="email" autoComplete="new-password" required />
                    <br />
                    Password
                    <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" autoComplete="new-password" required />
                    <br />
                    Confirm Password
                    <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder="password" type="password" autoComplete="new-password" required />
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