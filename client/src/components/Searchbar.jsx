import { Button } from "flowbite-react"
import { useState } from "react"
import { BiMicrophone } from "react-icons/bi"
import { IoSearch } from "react-icons/io5"
import { useNavigate } from "react-router"

function Searchbar() {
  const [searchQ, setSearchQ] = useState("")
  const navigate = useNavigate()
  return (
    <>
      <form
        id='searchForm'
        className='flex items-center justify-center w-full'
        onSubmit={(event) => {
          event.preventDefault()
          navigate(`/search/${searchQ}`)
        }}>
        <div className='relative flex items-center w-full'>
          <input
            type='search'
            name='search'
            id='search'
            value={searchQ}
            onChange={(event) => setSearchQ(event.target.value)}
            placeholder='Search...'
            required
            title='Search'
            className='peer rounded-s-full w-full focus:pl-10 transition-[padding] ease-linear duration-300'
          />
          <IoSearch className='absolute left-2 size-6 hidden peer-focus:block' />
        </div>
        <Button
          type='submit'
          title='SearchBtn'
          className='bg-gray-400/30 text-black pl-1 rounded-e-full hover:!bg-gray-400/50 focus:ring-2 focus:ring-blue-500 border border-gray-500 border-l-0'
          theme={{
            base: "",
            inner: {
              size: {
                md: "px-2 py-1 text-sm",
              },
            },
          }}>
          <IoSearch size={24} />
        </Button>
        <BiMicrophone className='size-10 hidden lg:block ml-2 bg-gray-400/30 p-1.5 rounded-full cursor-pointer hover:bg-gray-400/50 border border-gray-400' />
      </form>
    </>
  )
}

export default Searchbar
