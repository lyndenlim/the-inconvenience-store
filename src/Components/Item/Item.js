import { Carousel } from "react-bootstrap"
import "./Item.css"

function Item({ photo }) {
    return (
        <div className="photo-container">
            {photo.length > 1 ?
                <Carousel interval={null}>
                    {photo.map(image => <Carousel.Item key={image}> <img className="photo" src={require(`../../photos/${image}.jpeg`)} alt={image} /></Carousel.Item>)}
                </Carousel>
                :
                photo.map(image => <img className="photo" key={image} src={require(`../../photos/${image}.jpeg`)} alt={image} />)}
        </div>
    )
}

export default Item