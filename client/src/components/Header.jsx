import { Button, Navbar, NavbarBrand } from "flowbite-react"
import { SiYoutube } from "react-icons/si"
import Searchbar from "./Searchbar"
import { MdMenu } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { FaRegUserCircle } from "react-icons/fa"
import { toggleSidebar } from "../redux/settingsSlice"
import SignModal from "./SignModal"
import { useState } from "react"

function Header({className}) {
  const { c_user, regionCode } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [showLogin, setShowLogin] = useState(false)
  const handleSidebar = () => dispatch(toggleSidebar())
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

      <Searchbar />

      <div className='flex gap-2 items-center'>
        {c_user ? (
          <></>
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
