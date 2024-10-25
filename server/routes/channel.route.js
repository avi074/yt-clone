import { Router } from "express"
import multer from "multer"
import path from "path"
import fs from "fs-extra"
import { getChannel, createChannel } from "../controllers/channel.controller.js"

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { user } = req.tokenPayload
    // Define the temporary path based on userId
    const userDir = path.join(
      process.cwd(),
      "uploads",
      user.id,
      "generate-channel",
    )

    // Ensure the user directory exists
    try {
      await fs.ensureDir(userDir)
      cb(null, userDir) // Save the file to the userId directory
    } catch (err) {
      cb(err, "")
    }
  },
  filename: (req, file, cb) => {
    // Use a unique filename for the temporary upload (you can use Date.now or any unique method)
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

const channelRouter = Router()

// for getting channel by id
channelRouter.get("/:id", getChannel)

// For creating channel
channelRouter.post("/create", upload.single("avatar"), createChannel)

// For uploading channel
channelRouter.post("/:channelId/upload")

export default channelRouter
