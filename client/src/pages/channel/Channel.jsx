import { useParams } from "react-router"
import useFetch from "../../utils/useFetch"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { Button, Tabs } from "flowbite-react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { BsDot } from "react-icons/bs"
import VideoCard from "../../components/VideoCard"
import { IoSearch } from "react-icons/io5"
import { FaPhotoFilm } from "react-icons/fa6"

function Channel() {
  const { channelId } = useParams()
  const { user, token } = useSelector((state) => state.user)
  const url = `/api/channel/${channelId}`
  const urlParams = {
    headers: {
      Authorization: `ytClone ${token}`,
    },
  }

  const { data, loading, error } = useFetch(url, urlParams)

  const channel = useMemo(() => data, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error... {error.message}</div>

  return (
    <>
      <div className='flex flex-col gap-2 py-4'>
        {channel && (
          <>
            <div className='w-full h-52 rounded-xl overflow-clip'>
              <img
                src='/1.jpg'
                alt='Banner'
                className='w-full h-full object-cover hover:object-fill'
              />
            </div>
            <div className='flex w-full gap-4 shadow-md rounded-xl p-1 md:p-4 items-center'>
              <LazyLoadImage
                src={channel.avatar}
                alt=''
                className='h-28 md:h-48 aspect-square object-cover hover:object-contain rounded-full border-2'
              />
              <div className='flex-grow flex flex-col gap-2 justify-around md:px-4 '>
                <h1 className='font-bold text-ytBlack text-4xl'>
                  {channel.title}
                </h1>
                <div className='flex gap-2 items-center secondary-text'>
                  <span>{channel.subscribers} Subscribers</span>
                  <BsDot />
                  <span>{channel.videos.length} Videos</span>
                </div>
                <p className='secondary-text line-clamp-1'>
                  {channel.description}
                </p>
                <div className='flex flex-wrap gap-2 items-center justify-center md:justify-start w-fit'>
                  {channel.owner == user._id ? (
                    <>
                      <Button color='gray' pill className='border-2'>
                        Customize Channel
                      </Button>
                      <Button color='gray' pill className='border-2'>
                        Manage videos
                      </Button>
                    </>
                  ) : (
                    <Button color='dark'>Subscribe</Button>
                  )}
                </div>
              </div>
            </div>
            <Tabs variant='underline' className='p-4'>
              <Tabs.Item title='Home'>
                <div className='w-full flex flex-col gap-4 my-4 items-center'>
                  <FaPhotoFilm size={160} color='ytRed' />
                  <h1 className='font-semibold text-xl'>
                    Create content on any device
                  </h1>
                  <p className='text-pretty font-medium text-center'>
                    Upload and record at home or on the go.
                    <br />
                    Everything you make public will appear here.
                  </p>
                  <Button color='dark' pill className='tracking-wide'>
                    Create
                  </Button>
                </div>
              </Tabs.Item>
              <Tabs.Item active title='Videos'>
                {channel.videos.length > 0 ? (
                  channel.videos.map((videoId) => (
                    <VideoCard key={`channel-vid-${videoId}`} />
                  ))
                ) : (
                  <div className='w-full flex flex-col gap-4 my-4 items-center'>
                    <FaPhotoFilm size={160} color='ytRed' />
                    <h1 className='font-semibold text-xl'>
                      Create content on any device
                    </h1>
                    <p className='text-pretty font-medium text-center'>
                      Upload and record at home or on the go.
                      <br />
                      Everything you make public will appear here.
                    </p>
                    <Button color='dark' pill className='tracking-wide'>
                      Create
                    </Button>
                  </div>
                )}
              </Tabs.Item>
              <Tabs.Item title='Playlist'>
                <div className='w-full flex flex-col gap-4 my-4 items-center'>
                  <FaPhotoFilm size={160} color='ytRed' />
                  <h1 className='font-semibold text-xl'>
                    Create content on any device
                  </h1>
                  <p className='text-pretty font-medium text-center'>
                    Upload and record at home or on the go.
                    <br />
                    Everything you make public will appear here.
                  </p>
                  <Button color='dark' pill className='tracking-wide'>
                    Create
                  </Button>
                </div>
              </Tabs.Item>
              <Tabs.Item title='' icon={IoSearch}></Tabs.Item>
            </Tabs>
          </>
        )}
      </div>
    </>
  )
}

export default Channel
