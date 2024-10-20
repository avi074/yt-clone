import { Avatar, Card } from "flowbite-react"
import moment from "moment"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { BsDot } from "react-icons/bs"
import { Link } from "react-router-dom"

const VideoCard = ({ video, horizontal = false }) => {
  const { medium, standard, high, maxres } = video.snippet.thumbnails

  const convertToAbbreviation = (number) => {
    // Create a new Intl.NumberFormat object with options
    const formatter = new Intl.NumberFormat("en", {
      notation: "compact",
      compactDisplay: "short",
      maximumSignificantDigits: 3,
    })

    // Format the number and return the result
    return formatter.format(number)
  }

  function timeSinceUpload(uploadDate) {
    return moment(uploadDate).fromNow()
  }

  return (
    <Link to={`/watch/${video.id}`}>
      <Card
        theme={{
          root: {
            base: "flex",
            children: "h-full p-2",
          },
          img: {
            base: "w-full h-full object-cover aspect-video",
          },
        }}
        horizontal={horizontal}
        renderImage={({ img }, horizontal) => (
          <img
            className={`${img.base} ${
              horizontal ? img.horizontal.on : img.horizontal.off
            }`}
            src={video.snippet.thumbnails.default.url}
            srcSet={`
              ${maxres ? maxres.url + " 1280w," : ""} 
              ${high ? high.url + " 640w," : ""} 
              ${standard ? standard.url + " 480w," : ""} 
              ${medium ? medium.url + " 320w" : ""}
            `}
            sizes='(max-width: 640px) 320px, 
           (max-width: 1024px) 480px, 
           (max-width: 1440px) 640px, 
           1280px'
          />
        )}>
        {/* Video Information */}
        <div className='flex gap-2 items-start'>
          <Avatar img={`https://api.dicebear.com/9.x/initials/svg?seed=${video.snippet.channelTitle}&radius=50`} className="size-8"/>
          <div className='flex flex-col w-4/5 overflow-clip'>
            <p className='font-semibold line-clamp-2 break-words text-sm'>
              {video.snippet.title}
            </p>
            <div className='secondary-text text-sm font-medium'>
              <p className='line-clamp-1'>{video.snippet.channelTitle}</p>
              <p className='flex items-center scale-y-90 justify-start'>
                <span>
                  {convertToAbbreviation(video.statistics.viewCount)} views
                </span>
                <BsDot />
                <span> {timeSinceUpload(video.snippet.publishedAt)}</span>
              </p>
            </div>
          </div>
          <span>
            <BiDotsVerticalRounded className='icon-btn !size-6 !p-0.5' />
          </span>
        </div>
      </Card>
    </Link>
  )
}
export default VideoCard
