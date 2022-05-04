import { useEffect, useState } from "react"
import "./Homepage.css"
import items from "./items"
import Item from "../Item/Item"

function HomePage() {
  const [itemArray, setItemArray] = useState([])

  useEffect(() => {
    setItemArray(items.map(item => item))
  }, [])

  function sortByAll() {
    setItemArray(items.map(item =>item))
  }

  function sortByKitchen() {
    setItemArray(items.filter(item => item.category === "kitchen"))
  }

  function sortByRain() {
    setItemArray(items.filter(item => item.category === "rainy days"))
  }

  function sortBySecurity() {
    setItemArray(items.filter(item => item.category === "home security"))
  }

  function sortByPersonals() {
    setItemArray(items.filter(item => item.category === "personals"))
  }

  function sortByOther() {
    setItemArray(items.filter(item => item.category === "other"))
  }

  return (
    <div>
      <div className="category-container">
        <button onClick={sortByAll} className="category" >
          All
        </button>
        <button onClick={sortByKitchen} className="category" >
          Kitchen
        </button>
        <button onClick={sortByRain} className="category" >
          Rainy Days
        </button>
        <button onClick={sortBySecurity} className="category" >
          Home Security
        </button>
        <button onClick={sortByPersonals} className="category" >
          Personals
        </button>
        <button onClick={sortByOther} className="category" >
          Other
        </button>
      </div >
      <div className="item">
        {itemArray.map(item => <Item key={item.id} item={item} />)}
      </div>
    </div >
  )
}

export default HomePage