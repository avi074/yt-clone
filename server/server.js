import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import env from "./config/env.js"
import videoCategoryRouter from "./routes/videoCategory.route.js"
import startServer from "./config/startServer.js"
import logReqRes from "./middlewares/logReqRes.js"
import logger from "./utils/logger.js"
import searchRouter from "./routes/search.route.js"
import videoRouter from "./routes/video.route.js"
import userRouter from "./routes/user.route.js"
import channelRouter from "./routes/channel.route.js"
import path from "path"
import commentRouter from "./routes/comment.route.js"
import mongoose from "mongoose"
import { checkAutorization } from "./middlewares/token.js"

const app = express()

// Starting the Server
startServer(app, Number(env.SERVER_PORT))

// MongoDB Connection
connectDB()
// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logReqRes)

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack)
  const statusCode = err.statusCode || 500 // Default to 500 if not specified
  const message = statusCode === 500 ? "Internal Server Error" : err.message

  // Send response to client
  res.status(statusCode).json({ success: false, message })
})

//file upload path
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

// authentication handling
const handleAuth = checkAutorization((decode) => {
  return mongoose.Types.ObjectId.isValid(decode.user.id)
})

// Routers
app.use("/videoCategory", videoCategoryRouter)
app.use("/search", searchRouter)
app.use("/video", videoRouter)
app.use("/comment", handleAuth, commentRouter)
app.use("/user", userRouter)
app.use("/channel", handleAuth, channelRouter)
