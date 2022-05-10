import { Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./Item.css"

function Item({ item }) {
    return (
        <div className="photo-container" >
            {item.photos.length > 1 ?
                <Carousel className="carousel-dark" fade interval={null}>
                    {item.photos.map(image =>
                        <Carousel.Item key={image}>
                            <Link to={`/items/${item.id}`}>
                                <div className="item-content">
                                    <img id={item.id} className="photo" src={require(`../../photos/${image}.jpeg`)} alt={image} />
                                    <div className="name">{item.name}</div>
                                </div>
                            </Link>
                        </Carousel.Item>)}
                </Carousel>
                :
                item.photos.map(image =>
                    <Link key={image} to={`/items/${item.id}`}>
                        <div className="item-content">
                            <img id={item.id} className="photo" src={require(`../../photos/${image}.jpeg`)} alt={image} />
                            <span className="name">{item.name}</span>
                        </div>
                    </Link>)}
        </div>
    )
}

export default Item