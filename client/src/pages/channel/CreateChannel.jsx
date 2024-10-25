import axios from "axios"
import { Button, FileInput, Progress, Textarea } from "flowbite-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { fetchData } from "../../redux/userSlice"

function CreateChannel() {
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData(event.currentTarget)
      const res = await axios.post("/api/channel/create", formData, {
        headers: {
          Authorization: `ytClone ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data", // Use multipart/form-data if you expect files
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          setProgress(percent)
        },
      })

      if (res.status < 300) {
        alert("Channel Created Successfully!")
        dispatch(fetchData(localStorage.getItem("accessToken")))
        navigate(`/channel/${res.data.data}`)
      }
    } catch (error) {
      console.error("Error in channel creation:", error)
      alert(`Error Ocuured : ${error.message}`)
    }
  }

  return (
    <>
      <form
        id='create-channel-form'
        className='w-4/5 lg:w-2/3 xl:w-1/2 mx-auto rounded-xl shadow-xl border p-2'
        onSubmit={handleSubmit}>
        <h1 className='font-semibold text-ytBlack text-justify px-4 my-2 text-2xl border-b-2 '>
          Create Channel
        </h1>
        <fieldset className='flex flex-col gap-4 items-center justify-center p-4 pt-0 mx-auto'>
          <div className='channel-input-wrapper'>
            <label htmlFor='channel-avatar'>Channel Avatar : </label>
            <FileInput
              name='avatar'
              id='channel-avatar'
              accept='image/*'
              required
            />
          </div>
          <div className='channel-input-wrapper'>
            <label htmlFor='channel-name'>Channel Name : </label>
            <input
              type='text'
              name='title'
              id='channel-name'
              placeholder='Enter the channel name'
              required
            />
          </div>
          <div className='channel-input-wrapper'>
            <label htmlFor='channel-desc'>Channel Description : </label>
            <Textarea
              id='channel-desc'
              name='description'
              required
              className='focus:ring-blue-700 resize-none'
              rows={3}
            />
          </div>
        </fieldset>
        <Button.Group className='flex justify-center m-2'>
          <Button
            type='reset'
            pill
            color='red'
            className='font-bold tracking-wide text-ytRed/90'>
            Reset
          </Button>
          <Button
            type='submit'
            pill
            color='green'
            gradientMonochrome='success'
            className='font-bold tracking-wide '>
            Submit
          </Button>
        </Button.Group>
        {progress > 0 && progress != 100 && (
          <Progress
            progress={progress}
            progressLabelPosition='outside'
            labelProgress
            labelText
            textLabelPosition='outside'
            textLabel='Upload Progress :'
          />
        )}
      </form>
    </>
  )
}

export default CreateChannel
