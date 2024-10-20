import VideoCategories from "../components/VideoCategories"
import VideoCard from "../components/VideoCard"
import AppDrawer from "../components/AppDrawer"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

function Home() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const API_KEY = "AIzaSyAZ4GmcEPZvS_yEwak91UiTNKwsybjP5tY"
    axios
      .get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular", // Example: Get most popular videos
          regionCode: "IN", // Optional: region code (default 'US')
          maxResults: 12, // Optional: Number of videos to retrieve [1,50] (default: 5)
          key: API_KEY,
          // videoCategoryId:'2'
        },
      })
      .then((res) => {
        setVideos(res.data.items)
      })
      .catch((err) => console.error(err))
  }, [])
  console.log(videos)

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6 gap-2 gap-y-8 place-content-center'>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

export default Home
