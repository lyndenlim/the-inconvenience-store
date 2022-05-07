import "./OrderSummary.css"

function OrderSummary({ user, orderNumber }) { 
    return (
        <div className="order-summary-container">
            <div className="order-summary">
                <h1>Thanks for your order!</h1>
                <h3>Order #{orderNumber}</h3>
                <p>Please check your email for an order confirmation.</p>
                {user.orders.map(order => order.all_items)}
            </div>
        </div>
    )
}

export default OrderSummary