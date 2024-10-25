import { Card } from "flowbite-react"
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { BsDot } from "react-icons/bs"
import {convertToAbbreviation, timeSinceUpload} from "../utils/coventions.js"
import { useNavigate } from "react-router"

const VideoCard = ({ video, horizontal = false, short = false }) => {
  const navigate = useNavigate()

  let maxRetry = 3
  const handleClick = (videoId) => navigate(`/watch/${videoId}`)

  const handleError = (e) => {
    if (maxRetry) {
      e.currentTarget.src = `https://api.dicebear.com/9.x/initials/svg?seed=${video.channelTitle}&radius=50`
      maxRetry--
    } else {
      e.currentTarget.src = ""
    }
  }

  return (
    <LazyLoadComponent>
      <Card
        theme={{
          root: {
            base: "flex cursor-pointer",
            children: "h-full p-2",
            horizontal: {
              on: "rounded-lg shadow-lg p-2 border",
            },
          },
          img: {
            base: "w-full h-full object-cover aspect-video",
            horizontal: {
              on: "!w-1/2 rounded-lg",
            },
          },
        }}
        horizontal={horizontal}
        renderImage={({ img }, horizontal) => (
          <LazyLoadImage
            className={`${img.base} ${
              horizontal ? img.horizontal.on : img.horizontal.off
            }`}
            alt={video.title}
            loading='lazy'
            src={video.thumbnailUrl}
            onClick={() => handleClick(video._id)}
          />
        )}>
        {
          /* Video Information */
          //
        }
        <div className='flex gap-2 items-start'>
          <LazyLoadImage
            src={video.channelAvatar}
            alt=''
            loading='lazy'
            onError={handleError}
            className={`object-contain size-10 rounded-full ${
              short ? "hidden" : "inline"
            }`}
          />

          <div
            className='flex flex-col w-4/5 overflow-clip'
            onClick={() => handleClick(video._id)}>
            <p className='font-semibold line-clamp-2 break-words text-sm'>
              {video.title}
            </p>
            <div className='secondary-text text-sm font-medium'>
              <p className='line-clamp-1'>{video.channelTitle}</p>
              <p className='flex items-center flex-wrap scale-y-90 justify-start'>
                <span>
                  {convertToAbbreviation(video.statistics.views)} views
                </span>
                <BsDot />
                <span> {timeSinceUpload(video.publishedAt)}</span>
              </p>
            </div>
          </div>
          <span className={`${short ? "hidden" : "block"}`}>
            <BiDotsVerticalRounded className='icon-btn !size-6 !p-0.5' />
          </span>
        </div>
      </Card>
    </LazyLoadComponent>
  )
}
export default VideoCard
