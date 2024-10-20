import {
  Sidebar,
  SidebarCTA,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react"
import { useState } from "react"
import { BiHelpCircle } from "react-icons/bi"
import { CgMediaLive } from "react-icons/cg"
import { CiFlag1 } from "react-icons/ci"
import { FaRegNewspaper } from "react-icons/fa"
import { GoHome } from "react-icons/go"
import { IoSettingsOutline } from "react-icons/io5"
import {
  MdOutlineSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdOutlineShoppingBag,
  MdMusicNote,
  MdPodcasts,
  MdOutlineFeedback,
} from "react-icons/md"
import { PiFilmSlate, PiLightbulbLight } from "react-icons/pi"
import {
  SiYoutubeshorts,
  SiTrendmicro,
  SiYoutubegaming,
  SiStylelint,
  SiYoutube,
  SiYoutubestudio,
  SiYoutubemusic,
  SiYoutubekids,
} from "react-icons/si"
import { TfiCup } from "react-icons/tfi"
import { Link } from "react-router-dom"

function AppDrawer({ collapse, className='' }) {
  const items = {
    topIcons: [
      {
        name: "Home",
        icon: GoHome,
        link: "/",
      },
      {
        name: "Shorts",
        icon: SiYoutubeshorts,
        link: "/shorts",
      },
      {
        name: "Subscriptions",
        icon: MdOutlineSubscriptions,
        link: "/feed/subscriptions",
      },
    ],
    yourSection: [
      {
        name: "You",
        icon: MdVideoLibrary,
        link: "/feed/you",
      },
      {
        name: "History",
        icon: MdHistory,
        link: "/feed/history",
      },
    ],
    explore: [
      {
        name: "Trending",
        icon: SiTrendmicro,
        link: "/feed/trending",
      },
      {
        name: "Shopping",
        icon: MdOutlineShoppingBag,
        link: "/channel/",
      },
      {
        name: "Music",
        icon: MdMusicNote,
        link: "/channel/",
      },
      {
        name: "Movies",
        icon: PiFilmSlate,
        link: "/channel/",
      },
      {
        name: "Live",
        icon: CgMediaLive,
        link: "/channel/",
      },
      {
        name: "Gaming",
        icon: SiYoutubegaming,
        link: "/gaming",
      },
      {
        name: "News",
        icon: FaRegNewspaper,
        link: "/channel/",
      },
      {
        name: "Sports",
        icon: TfiCup,
        link: "/channel/",
      },
      {
        name: "Courses",
        icon: PiLightbulbLight,
        link: "/feed/courses_destination",
      },
      {
        name: "Fashion & Beauty",
        icon: SiStylelint,
        link: "/channel/",
      },
      {
        name: "Podcasts",
        icon: MdPodcasts,
        link: "/podcasts/",
      },
    ],
    moreSection: [
      {
        name: "YouTube Premium",
        icon: SiYoutube,
        link: "/premium",
        color: "red",
      },
      {
        name: "YouTube Studio",
        icon: SiYoutubestudio,
        link: "https://studio.youtube.com/",
        color: "red",
      },
      {
        name: "YouTube Music",
        icon: SiYoutubemusic,
        link: "https://music.youtube.com/",
        color: "red",
      },
      {
        name: "YouTube Kids",
        icon: SiYoutubekids,
        link: "https://www.youtubekids.com/?source=youtube_web",
        color: "red",
      },
    ],
    supportSec: [
      {
        name: "Settings",
        icon: IoSettingsOutline,
        link: "/account",
      },
      {
        name: "Report history",
        icon: CiFlag1,
        link: "/reporthistory",
      },
      {
        name: "Help",
        icon: BiHelpCircle,
        link: "/help",
      },
      {
        name: "Send feedback",
        icon: MdOutlineFeedback,
        link: "/feedback",
      },
    ],
  }

  const [activeItem, setActiveItem] = useState("Home")

  return (
    <div className={`bg-white self-start transition-[width] ease-linear duration-500 ${className}`}>
      {collapse ? (
        <div className='hidden md:flex flex-col gap-4 min-w-full'>
          {[...items.topIcons, items.yourSection[0]].map((ele) => (
            <Link
              to={ele.link}
              key={`collapsed-${ele.name}`}
              title={ele.name}
              className={`flex flex-col gap-1 py-2 px-1 scale-90 rounded-lg items-center justify-center hover:bg-primaryDark ${activeItem == ele.name && 'bg-primaryDark'}`}
              onClick={() => setActiveItem(ele.name)}>
              <ele.icon size={20} />
              <span className='text-xs font-semibold'>{ele.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <Sidebar
          aria-label='Sidebar'
          className="max-w-52"
          theme={{
            root: {
              inner:
                "h-full overflow-hidden hover:overflow-y-auto scrollbar-thin rounded px-1 dark:bg-gray-800",
            },
            item:{
              base:"flex p-2 rounded-lg",
              active:'bg-primaryDark'
            }
          }}>
          <SidebarItems>
            {Object.keys(items).map((key, idx) => (
              <SidebarItemGroup key={`${key}-${idx}`}>
                {items[key].map((ele, idx) => (
                  <SidebarItem
                    key={`${ele.name}-${idx}`}
                    icon={() => <ele.icon size={24} color={ele.color} />}
                    active={activeItem === ele.name}
                    onClick={() => setActiveItem(ele.name)}>
                    <span className='text-sm font-semibold'>{ele.name}</span>
                  </SidebarItem>
                ))}
              </SidebarItemGroup>
            ))}
          </SidebarItems>
          <SidebarCTA className='mt-4 p-0 bg-transparent'>
            <div className='mt-auto p-1 pt-4  border-t'>
              <ul className='text-sm flex flex-wrap gap-2 items-center secondary-text'>
                <li>
                  <a href='/about' className='hover:underline'>
                    About
                  </a>
                </li>
                <li>
                  <a href='/privacy' className='hover:underline'>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='/terms' className='hover:underline'>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href='/help' className='hover:underline'>
                    Help
                  </a>
                </li>
                <li>
                  <a href='/contact' className='hover:underline'>
                    Contact Us
                  </a>
                </li>
              </ul>
              <p className='text-xs secondary-text mt-4'>
                &copy; 2024 YouTube_Clone
              </p>
            </div>
          </SidebarCTA>
        </Sidebar>
      )}
    </div>
  )
}

export default AppDrawer
