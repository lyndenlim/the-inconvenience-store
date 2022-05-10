import { useEffect, useState } from "react"
import "./OrderHistoryItem.css"

function OrderHistoryItem({ order }) {
    const [orderTotal, setOrderTotal] = useState(order.all_items.map(item => parseFloat(JSON.parse(item.replaceAll("=>", ":")).total)).reduce((prev, current) => prev + current))

    return (
        <div>
            <div className="orders">
                <div>
                    Order #{order.order_number}
                    <br />
                    Placed on {order.order_date.replaceAll("-", "/")}
                </div>
                <br />
                <div className="order-history-image-container">
                    {order.all_items.map((item, index) => {
                        return (
                            <div className="order-history-image" key={index}>
                                <img className="order-history-thumbnail" src={require(`../../photos/${JSON.parse(item.replaceAll("=>", ":")).item.photos[0]}.jpeg`)} />
                                <div className="name-quantity-container">
                                    {JSON.parse(item.replaceAll("=>", ":")).item.name}
                                    <br />
                                    Qty: {JSON.parse(item.replaceAll("=>", ":")).quantity}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <br />
                <p>Order Total: <strong>${orderTotal.toFixed(2)}</strong></p>
            </div>
            <div>
                Shipping to:
                <br />
                {order.first_name} {order.last_name}
                <br />
                {order.address}
                {order.address2 ? <><br />{order.address2}</> : null}
                <br />
                {order.city} {order.state}, {order.postcode}
            </div>
            <hr />
        </div>
    )
}

export default OrderHistoryItem