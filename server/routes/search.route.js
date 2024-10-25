import { Router } from "express"
import { searchVideos } from "../controllers/search.controller.js"

const searchRouter = Router()

searchRouter.get("/", searchVideos)

export default searchRouter
