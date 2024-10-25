import { Router } from "express"
import { getVideoById } from "../controllers/video.controller.js"


const videoRouter = Router()

// get by id
videoRouter.get("/:id", getVideoById)

// get video by channelId

// channel video post

// put video by channelId
//delete video by channelId

export default videoRouter
