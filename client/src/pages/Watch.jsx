import { useParams } from "react-router"
import YouTubePlayer from "../components/YouTubePlayer"
import YouTube from "react-youtube"

function Watch() {
  const { videoId } = useParams()
  return (
    <div className='flex'>
      <div className='player-wrapper'>
        <YouTube
          videoId={videoId}
          opts={{
            width: "640px",
            height: "480px",
            playerVars: {
              autoplay: 1,
              controls: 1,
              rel: 0,
              iv_load_policy:3
            },
          }}
        />
      </div>
      <div className='video-suggestions'></div>
    </div>
  )
}

export default Watch
