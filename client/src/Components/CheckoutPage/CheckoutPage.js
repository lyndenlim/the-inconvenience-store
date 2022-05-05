import "./CheckoutPage.css"

function CheckoutPage() {
    return (
        <div className="row checkout-container">
            <div className="col-6" >
                <h2>Shipping Information</h2>
                <input placeholder="First Name"/>
                <input placeholder="Last Name"/>
                <br/>
                <input placeholder="Email"/>
                <br/>
                <input placeholder="Address"/>
                <br/>
                <input placeholder="Address 2 (Optional)"/>
                <br/>
                <input placeholder="Country"/>
                <input placeholder="City"/>
                <input placeholder="Postcode"/>
                <hr/>
                <h2>Payment</h2>
                <input placeholder="Name on Card"/>
                <input placeholder="Card Number"/>
                <br/>
                <input placeholder="Expiry Date"/>
                <input placeholder="Security Code"/>
                <br/>
                <button>Place Order</button>
            </div>
            <div className="col-6">
                Items here
                <br/>
            </div>

        </div>
    )
}

export default CheckoutPage