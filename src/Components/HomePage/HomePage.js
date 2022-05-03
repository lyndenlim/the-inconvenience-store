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
      {photoArray.map(photo => <Item key={photo} photo={photo}/>)}
    </div>
  )
}

export default HomePage