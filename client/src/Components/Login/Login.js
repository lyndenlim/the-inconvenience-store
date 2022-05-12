import "./Login.scss"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setUser }) {
    const navigate = useNavigate()
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [signupEmail, setSignupEmail] = useState("")
    const [signupPassword, setSignupPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const registrationContainer = useRef()

    function handleLogin(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        }).then(res => {
            if (res.ok) {
                res.json()
                    .then((user) => {
                        setUser(user)
                        navigate("/homepage")
                    });
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

    function handleSignUp(e) {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: signupEmail,
                password: signupPassword,
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

    function switchForm() {
        registrationContainer.current.classList.toggle("s--signup")
    }

    return (
        <div className="cont" ref={registrationContainer}>
            <div className="form sign-in">
                <h2 className="login-header">Welcome Back!</h2>
                <form onSubmit={handleLogin}>
                    <label className="input-label">
                        <span className="label-text">Email</span>
                        <input className="login-input" onChange={e => setLoginEmail(e.target.value)} type="email" required autoComplete="new-password" />
                    </label>
                    <label className="input-label">
                        <span className="label-text">Password</span>
                        <input className="login-input" onChange={e => setLoginPassword(e.target.value)} type="password" required autoComplete="new-password" />
                    </label>
                    <button type="submit" className="submit login-button">Log In</button>
                </form>
            </div>
            <div className="sub-cont">
                <div className="img">
                    <div className="img__text m--up">
                        <h2 className="signup-header">New here?</h2>
                        <p className="signup-subheader">Sign up and discover great new products!</p>
                    </div>
                    <div className="img__text m--in">
                        <h2 className="login-header">One of us?</h2>
                        <p className="login-subheader">If you already have an account, just sign in. We've missed you!</p>
                    </div>
                    <div onClick={switchForm} className="img__btn">
                        <span className="m--up">Sign Up</span>
                        <span className="m--in">Log In</span>
                    </div>
                </div>
                <div className="form sign-up">
                    <h2 className="signup-header">Let's Get Started</h2>
                    <form onSubmit={handleSignUp}>
                        <label className="input-label">
                            <span className="label-text">Email</span>
                            <input onChange={e => setSignupEmail(e.target.value)} className="signup-input" type="email" />
                        </label>
                        <label className="input-label">
                            <span className="label-text">Password</span>
                            <input onChange={e => setSignupPassword(e.target.value)} className="signup-input" type="password" />
                        </label>
                        <label className="input-label">
                            <span className="label-text">Confirm Password</span>
                            <input onChange={e => setConfirmPassword(e.target.value)} className="signup-input" type="password" />
                        </label>
                        <button type="submit" className="submit signup-button">Sign Up</button>
                    </form>
                </div>
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