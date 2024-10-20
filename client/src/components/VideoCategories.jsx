import axios from "axios"
import { useEffect, useRef, useState } from "react"

const VideoCategories = ({className}) => {
  const categoryListRef = useRef(null)
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState("0")

  useEffect(() => {
    axios
      .get("/api/videoCategory")
      .then((res) => setCategories(res.data.items))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    console.log('Active Categ Changed')
  }, [activeCategory])

  /**
   * handles mouse wheel event for horizontol scroll
   * @param {React.WheelEvent<HTMLDivElement>} event
   */
  const handleWheel = (event) => {
    if (categoryListRef.current) {
      categoryListRef.current.scrollBy({
        left: event.deltaY, // Adjust scroll speed
        behavior: "smooth",
      })
    }
  }

  /**
   * handles touch event for swipe positioning
   * @param {React.TouchEvent<HTMLDivElement>} event
   */
  const handleTouchStart = (event) => {
    const touch = event.touches[0]
    categoryListRef.current.dataset.startX = touch.clientX
  }

  /**
   * handles touch events for swipe left & right
   * @param {React.TouchEvent<HTMLDivElement>} event
   */
  const handleTouchMove = (event) => {
    const touch = event.touches[0]
    const startX = parseFloat(categoryListRef.current.dataset.startX)
    const distance = startX - touch.clientX

    if (categoryListRef.current) {
      categoryListRef.current.scrollBy({
        left: distance,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className={`w-full py-2 mx-auto ${className}`}>
      <div
        ref={categoryListRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className='categ-list'>
        <span
          id='videoCateg-0'
          className={`categ-item ${
            activeCategory == "0" ? "categ-active" : ""
          }`}
          onClick={() => setActiveCategory("0")}>
          All
        </span>
        {categories.map((category) => (
          <span
            id={`videoCateg-${category.ytId}`}
            key={category._id}
            className={`categ-item ${
              activeCategory == category._id ? "categ-active" : ""
            }`}
            onClick={() => setActiveCategory(category._id)}>
            {category.title}
          </span>
        ))}
      </div>
    </div>
  )
}

export default VideoCategories
