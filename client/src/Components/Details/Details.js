import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./Details.css"

function Details() {
    const { id } = useParams()
    const [itemDetails, setItemDetails] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [mainPhoto, setMainPhoto] = useState("")
    const [subPhotos, setSubPhotos] = useState([])

    useEffect(() => {
        async function getItemDetails() {
            const data = await axios.get(`/items/${id}`)
            setItemDetails(data.data)
            setPrice(parseFloat(data.data.price).toFixed(2))
            setMainPhoto(data.data.photos[0])
            setSubPhotos(data.data.photos.slice(1, data.data.photos.length))
        }

        getItemDetails()
    }, [])

    function addToCart(e) {
        e.preventDefault()
        console.log(quantity)
        setQuantity(1)
    }

    return (
        <div className="item-container">
            <div className="col-6 item-photo-container" >
                <img className="main-photo" src={mainPhoto ? require(`../../photos/${mainPhoto}.jpeg`) : null} alt="main" />
            </div>
            {subPhotos.length > 0 ?
                <div className="col-2 sub-photo-container">
                    {subPhotos.map(photo => <img className="sub-photo" src={require(`../../photos/${photo}.jpeg`)} alt="sub" />)}
                </div>
                :
                null}
            <div className="col-4 item-detail-container">
                <h1>{itemDetails.name}</h1>
                <h3>{`$${price}`}</h3>
                <p>Category: {itemDetails.category}</p>
                <p>{itemDetails.description}</p>
                <form onSubmit={addToCart}>
                    <input onChange={e => setQuantity(parseInt(e.target.value))} className="quantity" value={quantity} min="0" autoComplete="new-password" type="number" required />
                    <button onClick={() => setQuantity(quantity => quantity + 1)} type="button">+</button>
                    <button onClick={() => setQuantity(quantity => quantity - 1)} type="button">-</button>
                    <br />
                    <br />
                    <button type="submit">Add to cart</button>
                </form>
            </div>
        </div>
    )
}

export default Details