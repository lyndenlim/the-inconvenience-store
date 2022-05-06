import "./CheckoutPage.css"
import axios from "axios"
import { useEffect, useState } from "react"

function CheckoutPage({ user }) {
    const [orderDetails, setOrderDetails] = useState([])
    const [priceArray, setPriceArray] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [address2, setAddress2] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postcode, setPostcode] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [securityCode, setSecurityCode] = useState("")

    useEffect(() => {
        async function getOrderDetails() {
            const data = await axios.get(`/users/${user.id}`)
            setOrderDetails(data.data.carts)
            setPriceArray(data.data.carts.map(item => parseFloat(item.total)))
        }

        getOrderDetails()
    }, [])

    function placeOrder(e) {
        e.preventDefault()
        axios.post("/orders", {
            user_id: user.id,
            order: orderDetails,
            firstName: firstName,
            last_name: lastName,
            email: email,
            address: address,
            address2: address2,
            country: country,
            city: city,
            state: state,
            postcode: postcode,
            card_name: cardName,
            card_number: cardNumber,
            expiry_date: expiryDate,
            security_code: securityCode,
        })
            .then(res => console.log(res))
    }

    return (
        <div className="row checkout-container">
            <div className="col-8" >
                <h2>Shipping Information</h2>
                <form onSubmit={placeOrder}>
                    <input onChange={e => setFirstName(e.target.value)} value={firstName} placeholder="First Name" required />
                    <input onChange={e => setLastName(e.target.value)} value={lastName} placeholder="Last Name" required />
                    <br />
                    <input onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" required />
                    <br />
                    <input onChange={e => setAddress(e.target.value)} value={address} placeholder="Address" required />
                    <br />
                    <input onChange={e => setAddress2(e.target.value)} value={address2} placeholder="Address 2 (Optional)" />
                    <br />
                    <input onChange={e => setCountry(e.target.value)} value={country} placeholder="Country" required />
                    <input onChange={e => setCity(e.target.value)} value={city} placeholder="City" required />
                    <input onChange={e => setState(e.target.value)} value={state} placeholder="State/Province" required />
                    <input onChange={e => setPostcode(e.target.value)} value={postcode} placeholder="Postcode" required />
                    <hr />
                    <h2>Payment</h2>
                    <input onChange={e => setCardName(e.target.value)} value={cardName} placeholder="Name on Card" required />
                    <input onChange={e => setCardNumber(e.target.value)} value={cardNumber} placeholder="Card Number" type="number" className="number-input" required />
                    <br />
                    <input onChange={e => setExpiryDate(e.target.value)} value={expiryDate} placeholder="Expiry Date" />
                    <input onChange={e => setSecurityCode(e.target.value)} value={securityCode} placeholder="Security Code" type="number" className="number-input" required />
                    <br />
                    <button type="submit">Place Order</button>
                </form>
            </div>
            <div className="col-4">
                {orderDetails.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item.item.name} x{item.quantity} - ${parseFloat(item.total).toFixed(2)}</p>
                        </div>
                    )
                }
                )}
                {/* Subtotal: ${priceArray ? priceArray.reduce((prev, current) => prev + current).toFixed(2): null} */}
                <p>State Tax: $</p>
                <p>Shipping: $</p>
                <hr />
                <p>Total: $</p>
            </div>
        </div>
    )
}

export default CheckoutPage