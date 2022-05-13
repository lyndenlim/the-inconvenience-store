import { useEffect, useState, useRef, useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import "./Details.css"
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from "../../Components/UserContext/UserContext"

function Details() {
    const { id } = useParams()
    const [itemDetails, setItemDetails] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [mainPhoto, setMainPhoto] = useState("")
    const [subPhotos, setSubPhotos] = useState([])
    const photoArray = useRef()
    const { user } = useContext(UserContext)
    const { setCartCount } = useContext(UserContext)

    useEffect(() => {
        async function getItemDetails() {
            axios.get(`/items/${id}`)
                .then(data => {
                    setItemDetails(data.data)
                    setPrice(parseFloat(data.data.price).toFixed(2))
                    setMainPhoto(data.data.photos[0])
                    setSubPhotos(data.data.photos)
                })
        }

        async function setActivePhoto() {
            if (photoArray.current) {
                Array.from(photoArray.current.children).map(child => child.classList)[0].add("selected-photo")
            }
        }

        getItemDetails()
        setActivePhoto()
    }, [photoArray.current])

    function addQuantity() {
        if (quantity >= 1 && quantity < 10) {
            setQuantity(quantity => quantity + 1)
        }
    }

    function removeQuantity() {
        if (quantity > 1) {
            setQuantity(quantity => quantity - 1)
        }
    }

    function addToCart(e) {
        e.preventDefault()
        axios.post("/carts", {
            user_id: user.id,
            item_id: id,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            total: parseFloat(price) * parseInt(quantity)
        })
            .then(res => {
                if (res.status === 201) {
                    toast.success(`${quantity} ${itemDetails.name.toLowerCase()} added to cart.`, {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
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

        setCartCount(cartCount => cartCount + quantity)
        setQuantity(1)
    }

    function switchSelectedPhoto(photo) {
        Array.from(photoArray.current.children).forEach(child => {
            child.classList.remove("selected-photo")
            if (child.src.includes(photo)) {
                child.classList.add("selected-photo")
                setMainPhoto(photo)
            }
        })
    }


    return (
        <div className="item-container">
            <div className="col-6 item-photo-container">
                <img className="main-photo" src={mainPhoto ? require(`../../photos/${mainPhoto}.jpeg`) : null} alt="main" />
            </div>
            {subPhotos.length > 1 ?
                <div className="col-2 sub-photo-container" ref={photoArray}>
                    {subPhotos.map(photo => <img key={photo} onClick={() => switchSelectedPhoto(photo)} className="sub-photo" src={require(`../../photos/${photo}.jpeg`)} alt="sub" />)}
                </div>
                :
                null}
            <div className="col-4 item-detail-container">
                <h1>{itemDetails.name}</h1>
                <h3>{`$${price}`}</h3>
                <p>Category: {itemDetails.category}</p>
                <p>{itemDetails.description}</p>
                <div className="form-container">
                    <form onSubmit={addToCart}>
                        <div className="button-input-container">
                            <div className="input-container">
                                <input onChange={e => setQuantity(parseInt(e.target.value))} className="quantity" value={quantity} min="1" max="999" autoComplete="new-password" type="number" readOnly required />
                            </div>
                            <div className="button-container">
                                <div className="row">
                                    <button className="add-button" onClick={addQuantity} type="button">+</button>
                                </div>
                                <div className="row">
                                    <button className="minus-button" onClick={removeQuantity} type="button">-</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <button className="add-to-cart" type="submit">Add to cart</button>
                    </form>
                </div>
            </div>
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

export default Details