import { Router } from "express"
import handler from "../utils/handler.js"
import videoModel from "../models/video.model.js"

const { handlePromise } = handler("comment")

const commentRouter = Router()

// adds a comment to video
commentRouter.post("/:videoId", async (req, res) => {
  // @ts-ignore
  const { user } = req.tokenPayload
  const { videoId } = req.params
  const { username, userAvatar, text } = req.query

  const updatedVideo = await videoModel.findByIdAndUpdate(
    videoId,
    {
      $push: {
        comments: {
          $each: [{
            userId: user.id,
            username: username,
            userAvatar: userAvatar,
            text: text,
            publishedAt: new Date(),
          }],
          $position: 0,
        },
      },
    },
    { new: true }, // Return the updated document and create if missing
  )

  res.json({
    updatedVideo,
  })
})

// updates a comment
commentRouter.put("/:videoId/:commentId", async (req, res) => {
  // @ts-ignore
  const { user } = req.tokenPayload
  const { videoId, commentId } = req.params
  const { updatedText } = req.query

  const result = await handlePromise(
    videoModel.findOneAndUpdate(
      { _id: videoId, "comments._id": commentId, "comments.userId":user.id },
      {
        $set: {
          "comments.$.text": updatedText,
          "comments.$.updatedAt": new Date(),
        },
      },
      {
        new: true,
      },
    ),
    req.method,
  )
  res.status(result.statusCode).json({
    message: result.message,
    data: result.data,
  })
})

// deletes the comment
commentRouter.delete("/:videoId/:commentId", async (req, res) => {
  // @ts-ignore
  const { user } = req.tokenPayload
  const { videoId, commentId } = req.params

  const result = await handlePromise(
    videoModel.findByIdAndUpdate(
      videoId,
      {
        $pull: { comments: { _id: commentId, userId:user.id } }, // Remove the comment by its ID
      },
      { new: true }, // Return the updated document
    ),
    req.method,
  )

  res.status(result.statusCode).json({
    message: result.message,
    data: result.data,
  })
})

export default commentRouter
