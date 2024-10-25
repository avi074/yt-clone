import Header from "./components/Header"
import { Outlet } from "react-router"
import AppDrawer from "./components/AppDrawer"
import { useSelector } from "react-redux"

function App() {
  const { hideSidebar } = useSelector((state) => state.settings)

  return (
    <div className='flex flex-col gap-1 relative'>
      <Header className='fixed top-0 bg-white z-50' />
      <div className='p-1'>
        <AppDrawer
          collapse={hideSidebar}
          className={`fixed z-50 top-[3.8rem] -left-2 md:left-0 bg-white h-[calc(100vh-3.8rem)] py-2 px-1 xl:ml-1 ${
            hideSidebar ? "md:w-20" : "md:w-52"
          }`}
        />
        <div className='flex-grow pt-16 md:pl-20 pb-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
