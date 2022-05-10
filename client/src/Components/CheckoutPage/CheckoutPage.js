import 'bootstrap/dist/css/bootstrap.min.css';
import "./CheckoutPage.scss"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import gsap from "gsap"

function CheckoutPage({ user, setCartCount, orderNumber, setOrderNumber, orderDetails, setOrderDetails }) {
    console.log(orderDetails)
    const navigate = useNavigate()
    const [priceArray, setPriceArray] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("AL")
    const [postcode, setPostcode] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [securityCode, setSecurityCode] = useState("")
    const [stateSalesTax, setStateSalesTax] = useState(0)
    const [quantityArray, setQuantityArray] = useState([])

    useEffect(() => {
        async function getOrderDetails() {
            const data = await axios.get(`/users/${user.id}`)
            setOrderDetails(data.data.carts)
            setPriceArray(data.data.carts.map(item => parseFloat(item.total)))
            setQuantityArray(data.data.carts.map(item => parseInt(item.quantity)))
        }

        function getOrderNumber() {
            let randomNumber = ""
            for (let i = 0; i < 9; i++) {
                randomNumber += Math.floor(Math.random() * 10)
            }
            setOrderNumber(randomNumber)
        }

        function calculateSalesTax() {
            switch (state) {
                case "DE":
                    setStateSalesTax(0)
                    break;
                case "MT":
                    setStateSalesTax(0)
                    break;
                case "NH":
                    setStateSalesTax(0)
                    break;
                case "OR":
                    setStateSalesTax(0)
                    break;
                case "AK":
                    setStateSalesTax(0.0176)
                    break;
                case "HI":
                    setStateSalesTax(0.0444)
                    break;
                case "WY":
                    setStateSalesTax(0.0522)
                    break;
                case "WI":
                    setStateSalesTax(0.0543)
                    break;
                case "ME":
                    setStateSalesTax(0.0550)
                    break;
                case "VA":
                    setStateSalesTax(0.0575)
                    break;
                case "DC":
                    setStateSalesTax(0.060)
                    break;
                case "KY":
                    setStateSalesTax(0.060)
                    break;
                case "MD":
                    setStateSalesTax(0.060)
                    break;
                case "MI":
                    setStateSalesTax(0.060)
                    break;
                case "ID":
                    setStateSalesTax(0.0602)
                    break;
                case "VT":
                    setStateSalesTax(0.0624)
                    break;
                case "MA":
                    setStateSalesTax(0.0625)
                    break;
                case "PA":
                    setStateSalesTax(0.0634)
                    break;
                case "CT":
                    setStateSalesTax(0.0635)
                    break;
                case "SD":
                    setStateSalesTax(0.0640)
                    break;
                case "WV":
                    setStateSalesTax(0.0652)
                    break;
                case "NJ":
                    setStateSalesTax(0.0660)
                case "IA":
                    setStateSalesTax(0.0694)
                    break;
                case "NE":
                    setStateSalesTax(0.0694)
                    break;
                case "ND":
                    setStateSalesTax(0.0696)
                    break;
                case "NC":
                    setStateSalesTax(0.0698)
                    break;
                case "IN":
                    setStateSalesTax(0.070)
                    break;
                case "RI":
                    setStateSalesTax(0.070)
                    break;
                case "FL":
                    setStateSalesTax(0.0701)
                    break;
                case "MI":
                    setStateSalesTax(0.0707)
                    break;
                case "UT":
                    setStateSalesTax(0.0719)
                    break;
                case "OH":
                    setStateSalesTax(0.0722)
                    break;
                case "GA":
                    setStateSalesTax(0.0735)
                    break;
                case "SC":
                    setStateSalesTax(0.0744)
                    break;
                case "MN":
                    setStateSalesTax(0.0749)
                case "CO":
                    setStateSalesTax(0.0777)
                    break;
                case "NM":
                    setStateSalesTax(0.0784)
                    break;
                case "TX":
                    setStateSalesTax(0.0820)
                    break;
                case "NV":
                    setStateSalesTax(0.0823)
                    break;
                case "MO":
                    setStateSalesTax(0.0829)
                    break;
                case "AZ":
                    setStateSalesTax(0.0840)
                    break;
                case "NY":
                    setStateSalesTax(0.0852)
                    break;
                case "KS":
                    setStateSalesTax(0.0870)
                    break;
                case "IL":
                    setStateSalesTax(0.0881)
                    break;
                case "CA":
                    setStateSalesTax(0.0882)
                    break;
                case "OK":
                    setStateSalesTax(0.0897)
                    break;
                case "AL":
                    setStateSalesTax(0.0924)
                    break;
                case "WA":
                    setStateSalesTax(0.0929)
                    break;
                case "AR":
                    setStateSalesTax(0.0947)
                    break;
                case "LA":
                    setStateSalesTax(0.0955)
                    break;
                case "TN":
                    setStateSalesTax(0.0955)
                    break;
            }
        }

        getOrderDetails()
        getOrderNumber()
        calculateSalesTax()
    }, [state])

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
                    alert("Something went wrong.")
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
                            <Form.Select onChange={e => setState(e.target.value)} value={state}>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </Form.Select>
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
                                <div className="summary-item-total-quantity-container">
                                    <div className="summary-item-total-container">
                                        <h4>{item.item.name}</h4>
                                        <h4>${parseFloat(item.total).toFixed(2)}</h4>
                                    </div>
                                    <h5>Qty: {item.quantity}</h5>
                                </div>

                            </div>
                        )
                    }
                    )}
                    Subtotal: ${priceArray.length > 0 ? priceArray.reduce((prev, current) => prev + current).toFixed(2) : null}
                    <br />
                    State Tax: ${priceArray.length > 0 ? (priceArray.reduce((prev, current) => prev + current) * stateSalesTax).toFixed(2) : null}
                    <br />
                    Shipping: ${quantityArray.length > 0 ? (priceArray.reduce((prev, current) => prev + current) + quantityArray.reduce((prev, current) => prev + current) * quantityArray.reduce((prev, current) => prev + current) / 100).toFixed(2) : null}
                    <hr />
                    <h4>Total: ${priceArray.length > 0 ? (priceArray.reduce((prev, current) => prev + current) + priceArray.reduce((prev, current) => prev + current) * stateSalesTax + priceArray.reduce((prev, current) => prev + current) + quantityArray.reduce((prev, current) => prev + current) * quantityArray.reduce((prev, current) => prev + current) / 100).toFixed(2) : null}</h4>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage