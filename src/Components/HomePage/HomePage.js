import { useEffect, useState } from "react"
import "./Homepage.css"
import items from "./items"

function HomePage() {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const photoArray = items.map(item => item.photos)
    setPhotos(photoArray)
    // photoArray.map(photo => console.log(photo))
  }, [])

  return (
    <div className="item">
      {photos.map(photo => photo.map(item => <img key={item} className="photo" src={require(`../../photos/${item}.jpeg`)} alt={item} />))}
    </div>
  )
}

export default HomePage