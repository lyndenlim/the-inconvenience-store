import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./Details.css"

function Details() {
    const { id } = useParams()
    const [itemDetails, setItemDetails] = useState("")
    const [price, setPrice] = useState("")
    const [mainPhoto, setMainPhoto] = useState("") 

    useEffect(() => {
        async function getItemDetails() {
            const data = await axios.get(`/items/${id}`)
            setItemDetails(data.data)
            setPrice(parseFloat(data.data.price).toFixed(2))
            setMainPhoto(data.data.photos[0])
        }

        getItemDetails()
    },[])

    return (
        <div className="item-detail-container">
            <p>{itemDetails.name}</p>
            <p>{`$${price}`}</p>
            <p>Category: {itemDetails.category}</p>
            <p>{itemDetails.description}</p>
            {/* <img src={require(`../../photos/${mainPhoto}.jpeg`)} alt="main"/> */}
        </div>
    )
}

export default Details