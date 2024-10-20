import Header from "./components/Header"
import { Outlet } from "react-router"
import VideoCategories from "./components/VideoCategories"
import AppDrawer from "./components/AppDrawer"
import { useSelector } from "react-redux"

function App() {
  const { hideSidebar } = useSelector((state) => state.settings)

  return (
    <div className='flex flex-col gap-1 relative'>
      <Header className="sticky top-0 bg-white z-50" />
      <div className='flex gap-1 p-1 h-screen overflow-hidden'>
        <AppDrawer
          collapse={hideSidebar}
          className={`absolute z-50 top-16 left-0 md:sticky h-[calc(100vh-5rem)] py-2 px-1 ml-1 ${
            hideSidebar ? "md:w-20" : "md:w-52"
          }`}
        />
        <div
          className={`flex flex-col gap-2 relative mx-auto ${
            hideSidebar
              ? "w-[calc(100vw-6rem)]"
              : "w-[calc(100vw-6rem)]"
          } transition-[width] ease-linear duration-500`}>
          <VideoCategories className="absolute top-0 z-50 md:sticky bg-white" />
          <div className="flex-grow pt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
