import { Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./Item.css"

function Item({ photo }) {
    return (
        <div className="photo-container">
            {photo.length > 1 ?
                <Carousel fade interval={null}>
                    {photo.map(image =>
                        <Carousel.Item key={image}>
                            <Link to={`/items/${image}`}>
                                <div>
                                    <img className="photo" src={require(`../../photos/${image}.jpeg`)} alt={image} />
                                </div>
                            </Link>
                        </Carousel.Item>)}
                </Carousel>
                :
                photo.map(image =>
                    <Link key={image} to={`/items/${image}`}>
                        <div>
                            <img className="photo" src={require(`../../photos/${image}.jpeg`)} alt={image} />
                        </div>
                    </Link>)}
        </div>
    )
}

export default Item