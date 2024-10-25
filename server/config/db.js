import { connect } from "mongoose"
import env from "./env.js"
import logger from "../utils/logger.js"

/**
 * Connects to the mongodb instance
 */
const connectDB = async () => {
  try {
    await connect(env.MONGODB_URI)
    logger.log("MongoDB connected successfully")
  } catch (error) {
    logger.error(`MongoDB connection: ${error}`)
    process.exit(1)
  }
}

export default connectDB
