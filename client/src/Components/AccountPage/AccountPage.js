import "./AccountPage.css"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import ListGroup from "react-bootstrap/ListGroup"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderHistoryItem from "./OrderHistoryItem"
import ScaleLoader from "react-spinners/ScaleLoader"
import { UserContext } from "../../Components/UserContext/UserContext"

function AccountPage() {
    const [newEmail, setNewEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [orders, setOrders] = useState([])
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const { user } = useContext(UserContext)

    const handleCloseEmail = () => setShowEmail(false);
    const handleShowEmail = () => setShowEmail(true);
    const handleClosePassword = () => setShowPassword(false);
    const handleShowPassword = () => setShowPassword(true);


    useEffect(() => {
        async function getOrderInfo() {
            axios.get(`users/${user.id}`)
                .then(data => {
                    setOrders(data.data.orders)
                    setTimeout(() => {
                        setIsLoaded(true)
                    }, 1000)
                })
        }

        getOrderInfo()
    }, [])

    function changeEmail(e) {
        e.preventDefault();
        axios.patch(`/users/${user.id}`, {
            email: newEmail
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Email successfully updated!", {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    setNewEmail("")
                    handleCloseEmail()
                } else {
                    toast.error('Something went wrong, please try again later.', {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
    }

    function changePassword(e) {
        e.preventDefault()
        axios.patch(`/users/${user.id}`, {
            oldPassword: oldPassword,
            password: newPassword,
            password_confirmation: passwordConfirmation
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Password successfully updated!", {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    setOldPassword("")
                    setNewPassword("")
                    setPasswordConfirmation("")
                    handleClosePassword()
                } else {
                    toast.error('Something went wrong, please try again later.', {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
    }

    return (
        !isLoaded ?
            <div className="loader">
                <ScaleLoader />
            </div>
            :
            <div className="settings-container">
                <h2>Order History</h2>
                {orders.length > 0 ?
                    <div className="row orders">
                        {orders.map((order, index) => <div key={index}><OrderHistoryItem user={user} order={order} /></div>)}
                    </div> :
                    <div className="no-orders">
                        <h3>You haven't made any orders yet.</h3>
                    </div>
                }
                <div className="row settings">
                    <h3>Login & Security</h3>
                    <ListGroup>
                        <ListGroup.Item>
                            <div className="email-edit-container">
                                <label><strong>Email:</strong></label>
                                <button className="settings-edit-button" onClick={handleShowEmail}>Edit</button>
                            </div>
                            <p>{user.email}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="password-edit-container">
                                <label><strong>Password:</strong></label>
                                <button className="settings-edit-button" onClick={handleShowPassword}>Edit</button>
                            </div>
                            <p>********</p>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <Modal show={showEmail} onHide={handleCloseEmail} centered>
                    <form onSubmit={changeEmail}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change your email address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Label>New Email</Form.Label>
                            <Form.Control onChange={e => setNewEmail(e.target.value)} value={newEmail} placeholder="New Email" required />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                            <Button variant="secondary" onClick={handleCloseEmail}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <Modal show={showPassword} onHide={handleClosePassword} centered>
                    <form onSubmit={changePassword}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change your password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control onChange={e => setOldPassword(e.target.value)} value={oldPassword} placeholder="Current Password" type="password" required autoComplete="new-password" />
                            <br />
                            <Form.Label>New Password</Form.Label>
                            <Form.Control onChange={e => setNewPassword(e.target.value)} value={newPassword} placeholder="New Password" type="password" required autoComplete="new-password" />
                            <br />
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control onChange={e => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} placeholder="Confirm Password" type="password" required autoComplete="new-password" />
                            <br />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                            <Button variant="secondary" onClick={handleClosePassword}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
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

export default AccountPage