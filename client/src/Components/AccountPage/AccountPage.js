import "./AccountPage.css"
import { useState, useEffect } from "react"
import axios from "axios"

function AccountPage({ user }) {
    const [newEmail, setNewEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function getOrderInfo() {
            const data = await axios.get(`users/${user.id}`)
            setOrders(data.data.orders)
        }

        getOrderInfo()
    }, [])

    function changeEmail(e) {
        e.preventDefault();
        axios.patch(`/users/${user.id}`, {
            email: newEmail
        })
            .then(res => setNewEmail(""))
    }

    function changePassword(e) {
        e.preventDefault()
        axios.patch(`/users/${user.id}`, {
            oldPassword: oldPassword,
            password: newPassword,
            password_confirmation: passwordConfirmation
        })
            .then(res => {
                setOldPassword("")
                setNewPassword("")
                setPasswordConfirmation("")
            })
    }

    return (
        <>
            <div className="row orders">
                {orders.length > 0 ? orders.map((order, index) => {
                    return (
                        <div className="orders" key={index}>
                            <p>Order Placed {order.order_date.replaceAll("-", "/")}</p>
                            <p>{order.all_items}</p>
                        </div>
                    )
                }) : <h3><strong>You haven't made any order yet.</strong></h3>}
            </div>
            <div className="row settings">
                <span>{user.email}</span>
                <br />
                <form onSubmit={changeEmail}>
                    <input onChange={e => setNewEmail(e.target.value)} value={newEmail} placeholder="New Email" required />
                    <button type="submit">Change Email</button>
                </form>
                <br />
                <form onSubmit={changePassword}>
                    <input onChange={e => setOldPassword(e.target.value)} value={oldPassword} placeholder="Old Password" type="password" required autoComplete="new-password" />
                    <br />
                    <input onChange={e => setNewPassword(e.target.value)} value={newPassword} placeholder="New Password" type="password" required autoComplete="new-password" />
                    <br />
                    <input onChange={e => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} placeholder="Confirm Password" type="password" required autoComplete="new-password" />
                    <br />
                    <button type="submit">Change Password</button>
                </form>
            </div>
        </>
    )
}

export default AccountPage