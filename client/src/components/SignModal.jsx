import axios from "axios"
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalHeader,
  TabItem,
  Tabs,
} from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { BsGoogle } from "react-icons/bs"

function SignModal({ show, closeModal }) {
  const [isLogIn, setIsLogIn] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <Modal show={show} onClose={closeModal} size='md' position='top-center'>
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
          onReset={(e) => {}}>
          {!isLogIn && (
            <div className='input-wrapper'>
              <label htmlFor='user-name'>Username : </label>
              <input
                type='text'
                id='user-name'
                name='username'
                placeholder='Enter the username'
                onChange={handleChange}
                required
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
              onChange={handleChange}
              required
            />
          </div>

          <div className='input-wrapper'>
            <label htmlFor='user-password'>Password : </label>
            <input
              type='password'
              id='user-password'
              name='password'
              placeholder='Enter the password'
              onChange={handleChange}
              required
            />
          </div>

          <ButtonGroup position='end' className='flex justify-end px-2'>
            <Button type='submit' gradientMonochrome='success' className="font-semibold tracking-wide">
              Submit
            </Button>
            <Button type='reset' gradientMonochrome='failure' className="font-semibold tracking-wide">
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default SignModal
