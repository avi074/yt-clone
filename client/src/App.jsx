import { Button } from "flowbite-react"
import { useEffect, useState } from "react"

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const htmlElement = document.documentElement
    if (darkMode) {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }
  }, [darkMode])
  return (
    <>
      <h1 className='text-center text-3xl'>Hello</h1>
      <Button
        pill
        outline
        className='span:p-0'
        onClick={() => setDarkMode(!darkMode)}>
        Hello
      </Button>
    </>
  )
}

export default App
