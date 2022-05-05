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

    allCategory.current.classList.add("active")

    getAllItems()
  }, [])

  function sortByAll() {
    setItemArray(items.map(item => item))
    allCategory.current.classList.add("active")
    kitchenCategory.current.classList.remove("active")
    rainCategory.current.classList.remove("active")
    securityCategory.current.classList.remove("active")
    personalsCategory.current.classList.remove("active")
    otherCategory.current.classList.remove("active")
  }
  
  function sortByKitchen() {
    setItemArray(items.filter(item => item.category === "kitchen"))
    kitchenCategory.current.classList.add("active")
    allCategory.current.classList.remove("active")
    rainCategory.current.classList.remove("active")
    securityCategory.current.classList.remove("active")
    personalsCategory.current.classList.remove("active")
    otherCategory.current.classList.remove("active")
  }

  function sortByRain() {
    setItemArray(items.filter(item => item.category === "rainy days"))
    rainCategory.current.classList.add("active")
    kitchenCategory.current.classList.remove("active")
    allCategory.current.classList.remove("active")
    securityCategory.current.classList.remove("active")
    personalsCategory.current.classList.remove("active")
    otherCategory.current.classList.remove("active")
  }

  function sortBySecurity() {
    setItemArray(items.filter(item => item.category === "home security"))
    securityCategory.current.classList.add("active")
    rainCategory.current.classList.remove("active")
    kitchenCategory.current.classList.remove("active")
    allCategory.current.classList.remove("active")
    personalsCategory.current.classList.remove("active")
    otherCategory.current.classList.remove("active")
  }

  function sortByPersonals() {
    setItemArray(items.filter(item => item.category === "personals"))
    personalsCategory.current.classList.add("active")
    rainCategory.current.classList.remove("active")
    kitchenCategory.current.classList.remove("active")
    allCategory.current.classList.remove("active")
    securityCategory.current.classList.remove("active")
    otherCategory.current.classList.remove("active")
  }

  function sortByOther() {
    setItemArray(items.filter(item => item.category === "other"))
    otherCategory.current.classList.add("active")
    rainCategory.current.classList.remove("active")
    kitchenCategory.current.classList.remove("active")
    allCategory.current.classList.remove("active")
    securityCategory.current.classList.remove("active")
    personalsCategory.current.classList.remove("active")
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
        <button id="rainydays" onClick={sortByRain} className="category" ref={rainCategory}>
          Rainy Days
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