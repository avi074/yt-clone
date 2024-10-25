import axios from "axios"
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react"
import { useState } from "react"
import { BsEyeFill } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { fetchData } from "../redux/userSlice"

function SignModal({ show, closeModal }) {
  const [isLogIn, setIsLogIn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => {
    closeModal()
    setShowPassword(false)
    setIsLogIn(true)
  }

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)

      const res = await axios.post(
        isLogIn ? "/api/user/login" : "/api/user/signup",
        formData,
      )

      if (res.status < 299) {
        alert(`User ${isLogIn ? "logged in" : "registered"} successfully!`)
        if (isLogIn) {
          handleClose()
          localStorage.setItem("accessToken", res.data.accessToken)
          dispatch(fetchData(res.data.accessToken))
        } else {
          setIsLogIn(!isLogIn)
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle server-side validation errors
        alert(`Error: ${error.response.data.message}`)
      } else {
        // Handle other errors
        alert("An unexpected error occurred. Please try again.")
      }
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <Modal show={show} onClose={handleClose} size='md' position='top-center'>
      <ModalHeader
        theme={{
          base: "mt-3 p-2 flex items-center",
          title: "w-full px-4",
          close: {
            base: "mr-1 rounded-full border p-1 hover:border-ytRed hover:bg-red-300",
          },
        }}>
        <div className='tab-div'>
          <h3
            className={`tab-text ${!isLogIn && "tab-active"}`}
            onClick={() => setIsLogIn(false)}>
            Sign Up
          </h3>
          <hr className='tab-divider' />
          <h3
            className={`tab-text ${isLogIn && "tab-active"}`}
            onClick={() => setIsLogIn(true)}>
            Log In
          </h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <form
          id='signForm'
          className='flex flex-col gap-3 mb-2'
          onReset={handleClose}
          onSubmit={handleSubmit}>
          {!isLogIn && (
            <div className='input-wrapper'>
              <label htmlFor='user-name'>Username : </label>
              <input
                type='text'
                id='user-name'
                name='username'
                placeholder='Enter the username'
                required
                onPaste={(e) => {
                  e.preventDefault()
                }}
                onKeyDown={(e) => {
                  if (e.key == " ") {
                    e.preventDefault()
                  }
                }}
              />
            </div>
          )}

          <div className='input-wrapper'>
            <label htmlFor='user-email'>Email : </label>
            <input
              type='email'
              id='user-email'
              name='email'
              placeholder='Enter the email'
              required
            />
          </div>

          <div className='input-wrapper'>
            <label htmlFor='user-password'>Password : </label>
            <input
              type={showPassword ? "text" : "password"}
              id='user-password'
              name='password'
              placeholder='Enter the password'
              minLength='8'
              required
              className='!pr-8'
            />
            <BsEyeFill
              title='show password'
              onClick={togglePasswordVisibility}
              className='icon-btn !size-8 absolute right-0 bottom-0'
            />
          </div>

          <ButtonGroup position='end' className='flex justify-end px-2'>
            <Button
              type='submit'
              gradientMonochrome='success'
              className='font-semibold tracking-wide'>
              Submit
            </Button>
            <Button
              type='reset'
              gradientMonochrome='failure'
              className='font-semibold tracking-wide'>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default SignModal
