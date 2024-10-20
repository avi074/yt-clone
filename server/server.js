import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import env from "./config/env.js"
import videoCategoryRouter from "./routes/videoCategory.route.js"
import startServer from "./config/startServer.js"
import logReqRes from "./middlewares/logReqRes.js"
import logger from "./utils/logger.js"

const app = express()

// Starting the Server
startServer(app, Number(env.SERVER_PORT))

// MongoDB Connection
connectDB()
// Middlewares
app.use(cors())
app.use(express.json())
app.use(logReqRes)

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack)
  const statusCode = err.statusCode || 500; // Default to 500 if not specified
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;

  // Send response to client
  res.status(statusCode).json({ success: false, message });
})

// Routers
app.use("/videoCategory", videoCategoryRouter)
