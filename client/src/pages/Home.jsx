import VideoCategories from "../components/VideoCategories"
import VideoCard from "../components/VideoCard"
import { useSelector } from "react-redux"

function Home() {
  const { loading, error, videos } = useSelector((state) => state.videos)

  return (
    <>
      <VideoCategories />
      {loading && <div>Loading....</div>}
      {error && <div>Error.... {error}</div>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6 gap-2 gap-y-8 place-content-center'>
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </>
  )
}

export default Home
