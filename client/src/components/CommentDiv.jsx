import { Avatar, Button } from "flowbite-react"
import { BsDot } from "react-icons/bs"
import { useSelector } from "react-redux"
import { timeSinceUpload } from "../utils/coventions"
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component"

function CommentDiv({ comment, videoId}) {
  return (
    <>
      <LazyLoadComponent>
        <div className='flex gap-4 items-center border shadow-md p-2 rounded-xl'>
          <LazyLoadImage
            src={comment.userAvatar}
            alt=''
            className='size-10 mx-2 rounded-full'
          />
          <div className='flex-grow flex flex-col gap-2'>
            <p className='font-bold text-ytBlack flex gap-2 flex-wrap md:flex-nowrap items-center'>
              <span className="w-full line-clamp-1" title={comment.username}>{comment.username}</span>
              <span className="w-full flex justify-end items-center pr-4"><BsDot /> {timeSinceUpload(comment.publishedAt)}</span>
            </p>
            <pre
              className='text-balance line-clamp-2 cursor-pointer'
              onClick={(e) => {
                e.currentTarget.classList.toggle("line-clamp-2")
              }}>
              {comment.text}
            </pre>
          </div>
        </div>
      </LazyLoadComponent>
    </>
  )
}

export function CommentForm({videoId}) {
  const { user } = useSelector((state) => state.user)
  return (
    <>
      {user && (
        <form className='flex gap-4 items-center border shadow-md px-4 rounded-md'>
          <Avatar img={user.avatar} rounded />
          <fieldset className='flex-grow py-2'>
            <div className='input-wrapper'>
              <p className='font-bold flex gap-2 items-center'>
                {user.username} <BsDot /> {new Date().toLocaleDateString()}
              </p>
              <input type='text' name='text' />
            </div>
            <div className='flex gap-2 justify-end'>
              <Button type='submit' color='green'>
                Confirm
              </Button>
              <Button type='reset' color='red'>
                Cancel
              </Button>
            </div>
          </fieldset>
        </form>
      )}
    </>
  )
}

export default CommentDiv
