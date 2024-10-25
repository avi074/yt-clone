import { useParams } from "react-router"
import useFetch from "../utils/useFetch"
import { useEffect, useState } from "react"
import { Avatar } from "flowbite-react"
import { BiDislike, BiSolidLike } from "react-icons/bi"
import { convertToAbbreviation } from "../utils/coventions"
import { BsThreeDots } from "react-icons/bs"
import { useSelector } from "react-redux"
import VideoCard from "../components/VideoCard"
import CommentDiv, { CommentForm } from "../components/CommentDiv"

function Watch() {
  const { videoId } = useParams()
  const [currVideo, setCurrVideo] = useState(null)
  const { data, loading, error } = useFetch(`/api/video/${videoId}`)
  const { videos } = useSelector((state) => state.videos)

  useEffect(() => {
    if (data) {
      setCurrVideo(data)
    }
  }, [data])

  if (loading) {
    return <div>Loading....</div>
  }

  if (error) {
    return <div>error : {error}</div>
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-1 p-1 mb-8'>
      <div className=''>
        {currVideo && (
          <>
            {/* Video Player */}
            {currVideo.ytId ? (
              <iframe
                src={currVideo?.videoUrl}
                title={currVideo.title}
                className='w-full aspect-video rounded-xl'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowfullscreen></iframe>
            ) : (
              <div></div>
            )}
            {/* Basic Video & Channel Info  */}
            <div className='flex flex-col gap-2 pt-4'>
              <p
                title={currVideo.title}
                className='font-bold text-lg line-clamp-2'>
                {currVideo.title}
              </p>
              <div className='flex items-center gap-1 flex-wrap md:flex-nowrap md:gap-4'>
                <div className='flex items-center md:w-1/2'>
                  <Avatar img={currVideo.channelAvatar} alt='' className="min-w-10" rounded />
                  <div className='flex-grow flex flex-col px-2'>
                    <p className='font-bold tracking-wide text-ytBlack'>
                      {currVideo.channelTitle}
                    </p>
                    <p className='text-xs'>10.5 M Subscribers</p>
                  </div>
                  <button className='py-1.5 px-2 md:px-6 rounded-full text-ytWhite bg-ytBlack tracking-wide font-semibold hover:bg-black active:ring-2 active:ring-blue-500'>
                    Subscribe
                  </button>
                </div>
                <div className='w-full md:w-1/2 flex items-center justify-end gap-2 md:gap-8 md:px-4'>
                  <div className='flex justify-center items-center border-2 border-ytBlack/50 rounded-full overflow-clip'>
                    <button
                      title={currVideo.statistics.likes}
                      className='flex items-center px-2 hover:bg-ytBlack hover:text-ytWhite'>
                      <BiSolidLike className='icon-btn' />
                      <span className='font-semibold text-sm'>
                        {convertToAbbreviation(currVideo.statistics.likes)}
                      </span>
                    </button>
                    <button
                      title={currVideo.statistics.dislikes}
                      className='border-l-2 border-ytBlack/50 px-2 hover:bg-ytBlack hover:text-ytWhite'>
                      <BiDislike className='icon-btn hover:!bg-transparent' />
                    </button>
                  </div>
                  <BsThreeDots className='icon-btn justify-self-end' />
                </div>
              </div>
              {/* Description */}
              <div className='flex flex-col gap-4 bg-primaryDark p-4 rounded-xl'>
                <div className='flex items-center gap-4'>
                  <span className='font-medium'>
                    {currVideo.statistics.views} views
                  </span>
                  <span className='font-medium'>
                    {new Date(currVideo.publishedAt).toDateString()}
                  </span>
                </div>
                <pre
                  className='font-serif font-medium line-clamp-2 text-pretty cursor-pointer'
                  onClick={(e) => {
                    e.currentTarget.classList.toggle("line-clamp-2")
                  }}>
                  {currVideo.description}
                </pre>
              </div>
              {/* Comment Section */}
              {currVideo.statistics.commentCount > 0 && (
                <div className='flex flex-col gap-2 p-1 md:p-4'>
                  <p className='text-lg font-semibold mb-4'>
                    {currVideo.statistics.commentCount} Comments
                  </p>
                  <CommentForm videoId={currVideo._id} />
                  {currVideo.comments.map((comment) => (
                    <CommentDiv
                      videoId={currVideo._id}
                      key={`comment-${comment._id}`}
                      comment={comment}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className='pt-4 xl:px-4 flex flex-col gap-4'>
        <p className='text-2xl font-bold px-2'>Suggestions</p>
        {videos
          .filter((ele) => ele._id != currVideo?._id)
          .map((vid) => (
            <VideoCard
              key={`suggest-${vid._id}`}
              video={vid}
              horizontal={window.innerWidth > 480}
              short={window.innerWidth > 480}
            />
          ))}
      </div>
    </div>
  )
}

export default Watch
