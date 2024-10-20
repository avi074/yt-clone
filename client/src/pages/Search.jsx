import { useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import VideoCard from "../components/VideoCard"

function Search() {
  const [qVideos, SetQVideos] = useState(Array.from(new Int8Array(10)))
  const { query } = useParams()
  console.log(qVideos)
  return (
    <div className="flex flex-col">
      {qVideos.map((vid, idx) => (
        <Link to='/watch' key={`QueriedVideo-${vid}-${idx}`} className="w-3/5 h-36 mx-auto border rounded-xl overflow-clip">
        <div className="flex h-full">
        <img src="/1354206.jpeg" alt="video-Title" className="w-1/3 aspect-video object-cover" />
        {/* Video Metadata */}
        <div className="w-2/3 pl-5"> 
            <h1>Video Title</h1>
            <h1>Video Description</h1>
        </div>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default Search
