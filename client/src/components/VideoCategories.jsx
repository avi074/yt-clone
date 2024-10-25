import { useEffect, useRef, useState } from "react"
import useFetch from "../utils/useFetch"
import { useDispatch } from "react-redux"
import { searchVideosQ } from "../redux/videosSlice"

const VideoCategories = ({ className }) => {
  const categoryListRef = useRef(null)
  const { data, loading, error } = useFetch("/api/videoCategory/")
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState("0")
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      setCategories(data)
    }
  }, [data])

  const handleClick = (id) => {
    setActiveCategory(id)
  }
  
  useEffect(() => {
    dispatch(searchVideosQ({categoryId: activeCategory}))
  }, [activeCategory, dispatch])

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

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error : {error.message}</div>
  }

  return (
    <div
      className={`w-full py-2 mx-auto ${className}`}
      onMouseEnter={() => {
        document.body.style.overflow = "hidden"
      }}
      onMouseLeave={() => {
        document.body.style.overflow = ""
      }}>
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
          onClick={() => handleClick("0")}>
          All
        </span>
        {categories.map((category) => (
          <span
            id={`videoCateg-${category.ytId}`}
            key={category._id}
            className={`categ-item ${
              activeCategory == category._id ? "categ-active" : ""
            }`}
            onClick={() => handleClick(category._id)}>
            {category.title}
          </span>
        ))}
      </div>
    </div>
  )
}

export default VideoCategories
