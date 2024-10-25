import { Spinner } from "flowbite-react"

function Loader() {
  return (
    <div className='absolute w-screen h-screen flex items-center justify-center'>
      <Spinner
        aria-label='Loading...'
        className="size-2/12"
      />
    </div>
  )
}

export default Loader
