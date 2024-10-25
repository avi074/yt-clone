import { Avatar, Button, Dropdown, Navbar, NavbarBrand } from "flowbite-react"
import { SiYoutube } from "react-icons/si"
import Searchbar from "./Searchbar"
import { MdMenu } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { FaRegUserCircle } from "react-icons/fa"
import { toggleSidebar } from "../redux/settingsSlice"
import SignModal from "./SignModal"
import { useEffect, useState } from "react"
import { fetchData, logout } from "../redux/userSlice"
import { useNavigate } from "react-router"
import { IoSearch } from "react-icons/io5"

function Header({ className }) {
  const { user, token, error, regionCode } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const [showLogin, setShowLogin] = useState(false)
  const handleSidebar = () => dispatch(toggleSidebar())
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      alert(`Error in log-in : ${error}`)
    }
  }, [error])

  useEffect(() => {
    if (token) dispatch(fetchData(token))
  }, [token, dispatch])

  return (
    <Navbar
      aria-labelledby='Navbar'
      theme={{
        root: {
          base: `bg-white px-2 w-full py-2.5 sm:px-4 ${className} `,
          inner: {
            base: "pr-2.5 flex items-center justify-between",
            fluid: {
              off: "w-full",
            },
          },
        },
      }}>
      <div className='flex gap-6'>
        <MdMenu onClick={handleSidebar} className='icon-btn' />
        <NavbarBrand href='/' className='gap-2'>
          <SiYoutube className='size-8 text-ytRed' />
          <span className='font-bold text-lg'>YouTube</span>
          <sup className='font-medium'>{regionCode}</sup>
        </NavbarBrand>
      </div>

      <IoSearch className="icon-btn md:hidden" onClick={(e) => {
        e.currentTarget.nextElementSibling.classList.toggle('hidden')
      }}/>
      <div className='w-full absolute top-16 left-0 z-50 p-2 md:sticky md:block md:w-2/5 bg-white '>
        <Searchbar />
      </div>

      <div className='flex gap-2 items-center'>
        {user ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt={user.username} img={user.avatar} rounded />}>
              <Dropdown.Header>
                <span className='block text-sm'>{user.username}</span>
                <span className='block truncate text-sm font-medium'>
                  {user.email}
                </span>
              </Dropdown.Header>
              {user.channels.length == 0 ? (
                <Dropdown.Item onClick={() => navigate("/channel/new")}>
                  Create Channel
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  onClick={() => navigate(`/channel/${user.channels[0]}`)}>
                  View Channel
                </Dropdown.Item>
              )}
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => dispatch(logout())}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
            <BiDotsVerticalRounded className='icon-btn hidden md:block' />
            <Button
              color='white'
              pill
              className='border hover:bg-blue-100'
              title='SignIn'
              theme={{
                inner: {
                  base: "flex items-center gap-2 transition-all duration-200 text-blue-600",
                },
                size: {
                  md: "px-2 py-1 text-sm",
                },
              }}
              onClick={() => setShowLogin(true)}>
              <FaRegUserCircle size={20} />
              <span className='font-semibold hidden md:block'>Sign in</span>
            </Button>
            <SignModal
              show={showLogin}
              closeModal={() => setShowLogin(false)}
            />
          </>
        )}
      </div>
    </Navbar>
  )
}

export default Header
