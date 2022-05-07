import "./OrderConfirmation.css"

function OrderConfirmation({ user, orderNumber }) { 
    return (
        <div className="order-confirmation-container">
            <div>
                <h1>Thanks for your order!</h1>
                <h3>Order #{orderNumber}</h3>
                <p>Please check your email for an order confirmation.</p>
                {user.orders.map(order => order.all_items)}
            </div>
        </div>
    )
}

export default OrderConfirmation