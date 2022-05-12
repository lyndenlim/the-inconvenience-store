import axios from "axios"
import { useEffect, useState } from "react"
import "./OrderSummary.css"

function OrderSummary({ user, orderNumber, orderDetails }) {
    const [totalAmount, setTotalAmount] = useState(1)

    useEffect(() => {
        async function getTotalAmount() {
            const data = await axios.get(`/users/${user.id}`)
            setTotalAmount((parseFloat(data.data.orders[data.data.orders.length - 1].order_total)).toFixed(2))
        }

        getTotalAmount()
    }, [totalAmount])

    return (
        <div className="order-summary-container">
            <div className="order-summary">
                <h1>Thanks for your order!</h1>
                <h3>Order #{orderNumber}</h3>
                <p>Please check your email for an order confirmation.</p>
                {orderDetails.map((item, index) => {
                    return (
                        <div key={index} >
                            <div className="order-summary-container">
                                <img className="order-summary-image" src={require(`../../photos/${item.item.photos[0]}.jpeg`)} alt="item" />
                                <div className="order-summary-image-photo-container">
                                    <h4>{item.item.name}</h4>
                                    <h5>Qty: {item.quantity}</h5>
                                </div>
                            </div>
                            <br />
                        </div>
                    )
                })}
                <hr />
                <h3 className="grand-total">Total: ${totalAmount}</h3>
            </div>
        </div >
    )
}

export default OrderSummary