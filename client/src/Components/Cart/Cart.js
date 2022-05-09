import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Cart.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart({ user, cartCount, setCartCount }) {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        async function getCart() {
            const data = await axios.get(`/users/${user.id}`)
            setCartItems(data.data.carts)
        }

        getCart()
    }, [isDeleted])

    function removeFromCart(id, quantity) {
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id === id) {
                axios.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.status === 204) {
                            toast.success(`${quantity} ${cartItems[i].item.name.toLowerCase()} removed from cart.`, {
                                position: "bottom-right",
                                autoClose: 4000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            })
                            setIsDeleted(isDeleted => !isDeleted)
                            setCartCount(cartCount => cartCount - quantity)
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
        }
    }

    return (
        <div className="row col-container">
            {cartItems.length > 0 ? <h2>Shopping Cart</h2> : null}
            <div className="col-8 cart-items">
                {cartItems.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="cart-item-container" >
                                <div>
                                    <img className="cart-image" src={require(`../../photos/${item.item.photos[0]}.jpeg`)} alt="cart" />
                                </div>
                                <div className="cart-button-description-container">
                                    <div className="cart-description">
                                        <h3>{item.item.name}</h3>
                                        <h4>${(item.price * item.quantity).toFixed(2)}</h4>
                                    </div>
                                    <div className="cart-category-container">
                                        <h6>Category: {item.item.category}</h6>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="button-select">
                                        <span className="item-dropdown">
                                            <select>
                                                <option>
                                                    {item.quantity}
                                                </option>
                                            </select>
                                        </span>
                                        <span className="delete-button-container">
                                            <button className="delete-button" onClick={() => removeFromCart(item.id, item.quantity)}>Delete</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    )
                }
                )}
            </div>

            {cartItems.length > 0 ?
                <div className="col-4 cart-subtotal">
                    <p className="subtotal-text">Subtotal ({cartCount} items): <strong>${cartItems.map(item => parseFloat(item.price * item.quantity)).reduce((prev, current) => prev + current).toFixed(2)}</strong></p>
                    <button className="proceed-to-checkout" onClick={() => navigate("/checkout")}>Proceed to checkout</button>
                </div>
                :
                <div className="empty-cart">
                    <h1>Your Cart is Empty</h1>
                </div>
            }
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

export default Cart