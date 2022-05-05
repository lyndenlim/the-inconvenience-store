import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Cart.css"

function Cart({ setCartCount, cartCount, cartItems }) {
    const [total, setTotal] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        function getTotal() {
            if (cartItems.length > 0) {
                setTotal(cartItems.map(item => parseFloat(item.price * item.quantity)).reduce((prev, current) => prev + current).toFixed(2))
            }
        }

        getTotal()
    }, [])

    function removeFromCart(id) {
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id === id) {
                console.log(cartItems[i].quantity)
                setCartCount(cartCount => cartCount - cartItems[i].quantity)
                cartItems.splice(i, 1)
            }
        }
    }

    return (
        <div className="row">
            <div className="col-6 cart-items">
                {cartItems.map((item, index) => {
                    return (
                        <div className="cart-item-container" key={index}>
                            <img className="cart-image" src={require(`../../photos/${item.photo}.jpeg`)} alt="cart" />
                            <p className="cart-description">{item.name} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => removeFromCart(item.id)}>Delete</button>
                        </div>
                    )
                }
                )}
            </div>
            {cartItems.length > 0 ?
                <div className="col-6 cart-total">
                    <p>You have {cartCount} items.</p>
                    <p>Cart Total: ${total}</p>
                    <button onClick={() => navigate("/checkout")}>Checkout</button>
                </div>
                :
                <div className="empty-cart">
                    <h1>Your Cart is Empty</h1>
                </div>
            }

        </div>
    )
}

export default Cart