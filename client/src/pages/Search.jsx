import { useEffect } from "react"
import { useParams } from "react-router"
import VideoCard from "../components/VideoCard"
import { useDispatch, useSelector } from "react-redux"
import { searchVideosQ } from "../redux/videosSlice"

function Search() {
  const { videos, loading, error } = useSelector((state) => state.videos)
  const dispatch = useDispatch()
  const { query } = useParams()

  useEffect(() => {
    dispatch(searchVideosQ({ title: query }))
  }, [dispatch, query])

  if (loading) return <div>Loading..</div>

  if (error) return <div>Error : {error}</div>

  return (
    <div className='flex flex-col gap-4 items-center justify-center mx-auto mb-4 lg:w-2/3 xl:w-1/2'>
      {videos.map((video) => (
        <VideoCard key={`seached-${video._id}`} video={video} horizontal={window.innerWidth > 768}/>
      ))}
    </div>
  )
}

export default Search
