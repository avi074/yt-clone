import mongoose from "mongoose"
import connectDB from "../config/db.js"
import logger from "../utils/logger.js"

/**
 *
 * @param {string} endpoint
 * @param {function} fetchCallback
 * @param {function} updateCallback
 */
export default async function main(endpoint, fetchCallback, updateCallback) {
  await connectDB() // Connect to the database
  try {
    logger.info(`updating ${endpoint} in db...`)
    const items = await fetchCallback()
    await updateCallback(items)
    logger.success(`updated ${endpoint}!`)
  } catch (error) {
    logger.error(`Failed to update categories: ${error}`)
  } finally {
    logger.log("Closing MongoDB Conneection!")
    mongoose.connection.close() // Close the database connection
  }
}
