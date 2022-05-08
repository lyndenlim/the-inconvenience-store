import 'bootstrap/dist/css/bootstrap.min.css';
import "./CheckoutPage.scss"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import gsap from "gsap"

function CheckoutPage({ user, setCartCount, orderNumber, setOrderNumber }) {
    const navigate = useNavigate()
    const [orderDetails, setOrderDetails] = useState([])
    const [priceArray, setPriceArray] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postcode, setPostcode] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [securityCode, setSecurityCode] = useState("")
    const [shippingCost, setShippingCost] = useState(0)
    const [stateTax, setStateTax] = useState(0)

    useEffect(() => {
        async function getOrderDetails() {
            const data = await axios.get(`/users/${user.id}`)
            setOrderDetails(data.data.carts)
            setPriceArray(data.data.carts.map(item => parseFloat(item.total)))
        }

        function getOrderNumber() {
            let randomNumber = ""
            for (let i = 0; i < 9; i++) {
                randomNumber += Math.floor(Math.random() * 10)
            }
            setOrderNumber(randomNumber)
        }

        function calculateShippingCost() {
            setShippingCost(10)
        }

        getOrderDetails()
        getOrderNumber()
        calculateShippingCost()
    }, [])

    function placeOrder(e) {
        e.preventDefault()
        axios.post("/orders", {
            user_id: user.id,
            all_items: orderDetails,
            first_name: firstName,
            last_name: lastName,
            email: email,
            address: address,
            address2: address2,
            city: city,
            state: state,
            postcode: postcode,
            card_name: cardName,
            card_number: cardNumber,
            expiry_date: expiryDate,
            security_code: securityCode,
            order_number: orderNumber
        })
            .then(res => {
                if (res.status === 201) {
                    axios.delete("/clear")
                        .then(() => {
                            setCartCount(0)
                            setTimeout(() => {
                                navigate("/ordersummary")
                            }, 5000)
                        })
                } else {
                    alert("Error!")
                }
            })
    }

    function truckAnimation() {
        document.querySelectorAll('.truck-button').forEach(button => {
            let box = button.querySelector('.box'),
                truck = button.querySelector('.truck');

            if (!button.classList.contains('done')) {

                if (!button.classList.contains('animation')) {

                    button.classList.add('animation');

                    gsap.to(button, {
                        '--box-s': 1,
                        '--box-o': 1,
                        duration: .3,
                        delay: .5
                    });

                    gsap.to(box, {
                        x: 0,
                        duration: .4,
                        delay: .7
                    });

                    gsap.to(button, {
                        '--hx': -5,
                        '--bx': 50,
                        duration: .18,
                        delay: .92
                    });

                    gsap.to(box, {
                        y: 0,
                        duration: .1,
                        delay: 1.15
                    });

                    gsap.set(button, {
                        '--truck-y': 0,
                        '--truck-y-n': -26
                    });

                    gsap.to(button, {
                        '--truck-y': 1,
                        '--truck-y-n': -25,
                        duration: .2,
                        delay: 1.25,
                        onComplete() {
                            gsap.timeline({
                                onComplete() {
                                    button.classList.add('done');
                                }
                            }).to(truck, {
                                x: 0,
                                duration: .4
                            }).to(truck, {
                                x: 40,
                                duration: 1
                            }).to(truck, {
                                x: 20,
                                duration: .6
                            }).to(truck, {
                                x: 96,
                                duration: .4
                            });
                            gsap.to(button, {
                                '--progress': 1,
                                duration: 2.4,
                                ease: "power2.in"
                            });
                        }
                    });

                }

            } else {
                button.classList.remove('animation', 'done');
                gsap.set(truck, {
                    x: 4
                });
                gsap.set(button, {
                    '--progress': 0,
                    '--hx': 0,
                    '--bx': 0,
                    '--box-s': .5,
                    '--box-o': 0,
                    '--truck-y': 0,
                    '--truck-y-n': -26
                });
                gsap.set(box, {
                    x: -24,
                    y: -6
                });
            }
        })
    }

    return (
        <div className="row checkout-container">
            <div className="col-7 customer-info" >

                <Form onSubmit={placeOrder}>
                    <h2>Shipping Information</h2>
                    <Row>
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={e => setFirstName(e.target.value)} value={firstName} placeholder="First Name" required />
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={e => setLastName(e.target.value)} value={lastName} placeholder="Last Name" required />
                        </Col>
                    </Row>
                    <br />
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" required />
                    <br />
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={e => setAddress(e.target.value)} value={address} placeholder="Address" required />
                    <br />
                    <Form.Label>Address 2 (Optional)</Form.Label>
                    <Form.Control onChange={e => setAddress2(e.target.value)} value={address2} placeholder="Address 2" />
                    <br />
                    <Row>
                        <Col>
                            <Form.Label>City</Form.Label>
                            <Form.Control onChange={e => setCity(e.target.value)} value={city} placeholder="City" required />
                        </Col>
                        <Col>
                            <Form.Label>State/Province</Form.Label>
                            <Form.Control onChange={e => setState(e.target.value)} value={state} placeholder="State/Province" required />
                        </Col>
                        <Col>
                            <Form.Label>Postcode</Form.Label>
                            <Form.Control onChange={e => setPostcode(e.target.value)} value={postcode} placeholder="Postcode" className="number-input" type="number" required />
                        </Col>
                    </Row>
                    <hr />
                    <h2>Payment</h2>
                    <Form.Label>Name on card</Form.Label>
                    <Form.Control onChange={e => setCardName(e.target.value)} value={cardName} placeholder="Name on Card" required />
                    <br />
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control onChange={e => setCardNumber(e.target.value)} value={cardNumber} placeholder="Card Number" type="number" className="number-input" required />
                    <br />
                    <Row>
                        <Col>
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control onChange={e => setExpiryDate(e.target.value)} value={expiryDate} placeholder="Expiry Date" />
                        </Col>
                        <Col>
                            <Form.Label>Security Code</Form.Label>
                            <Form.Control onChange={e => setSecurityCode(e.target.value)} value={securityCode} placeholder="Security Code" type="number" className="number-input" required />
                        </Col>
                    </Row>
                    <br />
                    <div className="truck-button-container">
                        <button onClick={truckAnimation} className="truck-button" type="submit">
                            <span className="default">Place Order</span>
                            <span className="success">
                                Order Placed
                                <svg viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </svg>
                            </span>
                            <div className="truck">
                                <div className="wheel"></div>
                                <div className="back"></div>
                                <div className="front"></div>
                                <div className="box"></div>
                            </div>
                        </button>
                    </div>
                </Form>
            </div>
            <div className="col-5 summary-container">
                <div className="summary">
                    {orderDetails.map((item, index) => {
                        return (
                            <div className="checkout-item" key={index}>
                                <img className="checkout-image" src={require(`../../photos/${item.item.photos[0]}.jpeg`)} alt="item" />
                                <p>{item.item.name} x{item.quantity} - ${parseFloat(item.total).toFixed(2)}</p>
                            </div>
                        )
                    }
                    )}
                    Subtotal: ${priceArray.length > 0 ? priceArray.reduce((prev, current) => prev + current).toFixed(2) : null}
                    <br />
                    State Tax: ${stateTax}
                    <br />
                    Shipping: ${shippingCost.toFixed(2)}
                    <hr />
                    <h4>Total: ${priceArray.length > 0 ? (priceArray.reduce((prev, current) => prev + current) + stateTax + shippingCost).toFixed(2) : null}</h4>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage