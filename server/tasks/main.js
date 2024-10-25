import mongoose from "mongoose"
import connectDB from "../config/db.js"
import logger from "../utils/logger.js"

/**
 *
 * @param {string} endpoint
 * @param {function} callback
 */
export default async function main(endpoint, callback) {
  await connectDB() // Connect to the database
  try {
    logger.info(`updating ${endpoint} in db...`)
    await callback()
    logger.success(`updated ${endpoint}!`)
  } catch (error) {
    logger.error(`Failed to update ${endpoint}: ${error.message}`)
  } finally {
    logger.log("Closing MongoDB Conneection!")
    mongoose.connection.close() // Close the database connection
  }
}
