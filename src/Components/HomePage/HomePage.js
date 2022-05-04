import { useEffect, useState } from "react"
import "./Homepage.css"
import items from "./items"
import Item from "../Item/Item"

function HomePage() {
  const [photoArray, setPhotoArray] = useState([])

  useEffect(() => {
    setPhotoArray(items.map(item => item.photos))
  }, [])

  return (
    <div className="item">
      {photoArray.map((photo, index) => <Item key={photo} id={index + 1} photo={photo} />)}
    </div>
  )
}

export default HomePage