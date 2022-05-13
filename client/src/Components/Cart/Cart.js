import { useEffect, useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import empty_cart from "../../photos/empty_cart.jpg"
import "./Cart.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion"
import Form from "react-bootstrap/Form"
import { UserContext } from "../../Components/UserContext/UserContext"

function Cart() {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(UserContext)
    const { cartCount } = useContext(UserContext)
    const { setCartCount } = useContext(UserContext)

    useEffect(() => {
        async function getCartData() {
            axios.get(`/users/${user.id}`)
                .then(data => {
                    setCartItems(data.data.carts)
                    setIsLoading(false)
                })
        }

        getCartData()
    }, [isDeleted, isUpdated, cartItems.length])

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

    function editQuantity(e, id, quantity, price) {
        axios.patch(`/carts/${id}`, {
            quantity: parseInt(e.target.value),
            total: parseInt(e.target.value) * price
        })
            .then(() => {
                setIsUpdated(isUpdated => !isUpdated)
            })

        if (parseInt(e.target.value) < quantity) {
            setCartCount(cartCount => cartCount - (quantity - parseInt(e.target.value)))
        } else if (parseInt(e.target.value) > quantity) {
            setCartCount(cartCount => cartCount + (parseInt(e.target.value) - quantity))
        }
    }

    return (
        <div className="row col-container">
            {cartCount > 0 ? <h2 className="shopping-cart-header">Shopping Cart</h2> : null}
            <div className="col-8 cart-items">
                {cartItems.map((item, index) => {
                    return (
                        <div className="overall-cart-item-container" key={index}>
                            <div className="cart-item-container" >
                                <Link className="item-link" to={`/items/${item.item.id}`}>
                                    <div>
                                        <img className="cart-image" src={require(`../../photos/${item.item.photos[0]}.jpeg`)} alt="cart" />
                                    </div>
                                </Link>
                                <div className="cart-button-description-container">
                                    <div className="cart-description">
                                        <Link className="item-link" to={`/items/${item.item.id}`}>
                                            <h3>{item.item.name}</h3>
                                        </Link>
                                        <h4>${(item.price * item.quantity).toFixed(2)}</h4>
                                    </div>
                                    <div className="cart-category-container">
                                        <h6>Category: {item.item.category}</h6>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="button-select" >
                                        <Form.Select onChange={e => editQuantity(e, item.id, item.quantity, item.price)} value={item.quantity}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                        </Form.Select>
                                        <span className="separator"></span>
                                        <button className="delete-button" onClick={() => removeFromCart(item.id, item.quantity)}>Remove</button>
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
                    <p className="subtotal-text">Subtotal ({cartCount} items): <strong>${cartItems.map(item => parseFloat(item.total)).reduce((prev, current) => prev + current).toFixed(2)}</strong></p>
                    <button className="proceed-to-checkout" onClick={() => navigate("/checkout")}>Proceed to checkout</button>
                </div>
                :
                !isLoading ?
                    <motion.div className="empty-cart" initial={{ y: -100 }} animate={{ y: 0 }}>
                        <div className="empty-cart-image-container">
                            <img className="empty-cart-image" src={empty_cart} alt="empty-cart" />
                        </div>
                        <h1 className="your-cart-empty">Your Cart is Empty</h1>
                    </motion.div> : null
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