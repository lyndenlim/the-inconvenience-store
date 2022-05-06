import { useEffect, useState, useRef } from "react"
import "./Homepage.css"
import Item from "../Item/Item"
import axios from "axios"

function HomePage() {
  const [itemArray, setItemArray] = useState([])
  const [items, setItems] = useState([])
  const allCategory = useRef()
  const kitchenCategory = useRef()
  const rainCategory = useRef()
  const securityCategory = useRef()
  const personalsCategory = useRef()
  const otherCategory = useRef()

  useEffect(() => {
    async function getAllItems() {
      const data = await axios.get("/items")
      setItems(data.data)
      setItemArray(data.data.map(item => item))    
    }

    allCategory.current.classList.add("selected-category")

    getAllItems()
  }, [])

  function sortByAll() {
    setItemArray(items.map(item => item))
    allCategory.current.classList.add("selected-category")
    kitchenCategory.current.classList.remove("selected-category")
    rainCategory.current.classList.remove("selected-category")
    securityCategory.current.classList.remove("selected-category")
    personalsCategory.current.classList.remove("selected-category")
    otherCategory.current.classList.remove("selected-category")
  }
  
  function sortByKitchen() {
    setItemArray(items.filter(item => item.category === "kitchen"))
    kitchenCategory.current.classList.add("selected-category")
    allCategory.current.classList.remove("selected-category")
    rainCategory.current.classList.remove("selected-category")
    securityCategory.current.classList.remove("selected-category")
    personalsCategory.current.classList.remove("selected-category")
    otherCategory.current.classList.remove("selected-category")
  }

  function sortByRain() {
    setItemArray(items.filter(item => item.category === "weather"))
    rainCategory.current.classList.add("selected-category")
    kitchenCategory.current.classList.remove("selected-category")
    allCategory.current.classList.remove("selected-category")
    securityCategory.current.classList.remove("selected-category")
    personalsCategory.current.classList.remove("selected-category")
    otherCategory.current.classList.remove("selected-category")
  }

  function sortBySecurity() {
    setItemArray(items.filter(item => item.category === "home security"))
    securityCategory.current.classList.add("selected-category")
    rainCategory.current.classList.remove("selected-category")
    kitchenCategory.current.classList.remove("selected-category")
    allCategory.current.classList.remove("selected-category")
    personalsCategory.current.classList.remove("selected-category")
    otherCategory.current.classList.remove("selected-category")
  }

  function sortByPersonals() {
    setItemArray(items.filter(item => item.category === "personals"))
    personalsCategory.current.classList.add("selected-category")
    rainCategory.current.classList.remove("selected-category")
    kitchenCategory.current.classList.remove("selected-category")
    allCategory.current.classList.remove("selected-category")
    securityCategory.current.classList.remove("selected-category")
    otherCategory.current.classList.remove("selected-category")
  }

  function sortByOther() {
    setItemArray(items.filter(item => item.category === "other"))
    otherCategory.current.classList.add("selected-category")
    rainCategory.current.classList.remove("selected-category")
    kitchenCategory.current.classList.remove("selected-category")
    allCategory.current.classList.remove("selected-category")
    securityCategory.current.classList.remove("selected-category")
    personalsCategory.current.classList.remove("selected-category")
  }

  return (
    <div className="homepage-container">
      <div className="category-container">
        <button id="all" onClick={sortByAll} className="category" ref={allCategory}>
          All
        </button>
        <button id="kitchen" onClick={sortByKitchen} className="category" ref={kitchenCategory}>
          Kitchen
        </button>
        <button id="weather" onClick={sortByRain} className="category" ref={rainCategory}>
          Weather
        </button>
        <button id="homesecurity" onClick={sortBySecurity} className="category" ref={securityCategory}>
          Home Security
        </button>
        <button id="personals" onClick={sortByPersonals} className="category" ref={personalsCategory}>
          Personals
        </button>
        <button id="other" onClick={sortByOther} className="category" ref={otherCategory}>
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