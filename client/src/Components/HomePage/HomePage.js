import { useEffect, useState, useRef } from "react"
import "./Homepage.css"
import Item from "../Item/Item"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import ScaleLoader from "react-spinners/ScaleLoader";

function HomePage() {
  const [itemArray, setItemArray] = useState([])
  const [items, setItems] = useState([])
  const allCategory = useRef()
  const kitchenCategory = useRef()
  const rainCategory = useRef()
  const securityCategory = useRef()
  const personalsCategory = useRef()
  const otherCategory = useRef()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function getAllItems() {
      axios.get("/items").
        then(data => {
          setItems(data.data)
          setItemArray(data.data.map(item => item))
          setTimeout(() => {
            setIsLoaded(true)
          }, 1000)
        })
    }

    async function setInitialCategory() {
      if (allCategory.current) {
        allCategory.current.classList.add("selected-category")
      }
    }

    getAllItems()
    setInitialCategory()
  }, [isLoaded])

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
    !isLoaded ?
      <div className="loader">
        <ScaleLoader />
      </div>
      :
      <div className="homepage-container">
        <motion.div className="category-container">
          <motion.button whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400 }} id="all" onClick={sortByAll} className="category" ref={allCategory}>
            All
          </motion.button>
          <motion.button whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400 }} id="kitchen" onClick={sortByKitchen} className="category" ref={kitchenCategory}>
            Kitchen
          </motion.button>
          <motion.button whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400 }} id="weather" onClick={sortByRain} className="category" ref={rainCategory}>
            Weather
          </motion.button>
          <motion.button whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400 }} id="homesecurity" onClick={sortBySecurity} className="category" ref={securityCategory}>
            Home Security
          </motion.button>
          <motion.button whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400 }} id="personals" onClick={sortByPersonals} className="category" ref={personalsCategory}>
            Personals
          </motion.button>
          <motion.button whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400 }} id="other" onClick={sortByOther} className="category" ref={otherCategory}>
            Other
          </motion.button>
        </motion.div >
        <motion.div className="item" layout>
          <AnimatePresence>
            {itemArray.map(item => <Item key={item.id} item={item} />)}
          </AnimatePresence>
        </motion.div>
        <div className="footer">
          <span>All artwork designed by <a className="katerina" href="https://www.theuncomfortable.com/" target="_blank" rel="noopener noreferrer"><strong>Katerina Kamprani</strong></a></span>
        </div>
      </div >
  )
}

export default HomePage