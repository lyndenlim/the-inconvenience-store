import { useEffect, useState } from "react"
import "./OrderSummary.css"

function OrderSummary({ orderNumber, orderDetails }) {
    const [grandTotal, setGrandTotal] = useState([])

    useEffect(() => {
        setGrandTotal(orderDetails.map(item => parseFloat(item.price)).reduce((prev, current) => prev + current))
    }, [])

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
                                <h4>{item.item.name}</h4>
                                <h5>Qty: {item.quantity}</h5>
                            </div>
                            <br />
                        </div>
                    )
                })}
                <h3 className="grand-total">Total: ${orderDetails.length > 0 ? grandTotal.toFixed(2) : null}</h3>
            </div>
        </div >
    )
}

export default OrderSummary