import { Router } from "express"
import { getVideoCategories } from "../controllers/videoCategory.controller.js"

const videoCategoryRouter = Router()

videoCategoryRouter.get("/", getVideoCategories)

videoCategoryRouter.all("/:subpath*?", (req, res) => {
  res
    .status(405)
    .json({
      message: `${req.method} Method not allowed on this endpoint(${req.originalUrl}).`,
    })
})

export default videoCategoryRouter
