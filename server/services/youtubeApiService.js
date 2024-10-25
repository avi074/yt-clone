import axios from "axios"
import env from "../config/env.js"
import logger from "../utils/logger.js"
import { ytEndpointConfig } from "../config/youtubeEndpoints.js"

/**
 * Generic YouTube API Call Function
 *  - To handle all the api calls at one point
 * @param {String} endpoint - youtube api endpoint to make request
 * @param {Object} userParams - api params for the endpoint
 * @returns 
 */
const callYouTubeAPI = async (endpoint, userParams = {}) => {
  logger.info(`fetching ${endpoint}...`)
  try {
    // Include the API key in the params
    const config = {
      params: {
        ...ytEndpointConfig[endpoint], // default params by endpoint
        ...userParams,
        key: env.YOUTUBE_API_KEY,
      },
    }
    // console.log(config)
    // Make the request
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/${endpoint}`,
      config,
    )
    logger.success(`fetched ${endpoint}!`)
    // Return the data from the response
    return response.data.items
  } catch (error) {
    logger.error(`YouTube API: ${error.message}`)
    logger.error(`failed to fetch ${endpoint}!`)
    throw error.response.data.error // Re-throw to handle errors outside this function
  }
}

export default callYouTubeAPI