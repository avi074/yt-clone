import mongoose from "mongoose"
import videoModel from "../models/video.model.js"
import handler from "../utils/handler.js"

const { handlePromise } = handler("searchedVideos")

const cache = {}

const CACHE_DURATION = 1000 * 60 * 60 // 1hr
/**
 * fetches cached data
 * @param {string} key 
 * @returns 
 */
const getCachedData = (key) => {
  const cachedItem = cache[key]
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
    return cachedItem.data // Return cached data if it's still valid
  }
  return null
}

/**
 * sets the cached data with key
 * @param {string} key 
 * @param {object} data 
 */
const setCachedData = (key, data) => {
  cache[key] = {
    data,
    timestamp: Date.now(),
  }
}

/**
 * searches the videos according to query
 * @param {import('express').Request} req Request
 * @param {import('express').Response} res Response
 *
 */
export async function searchVideos(req, res) {
  try {
    const { title, categoryId, maxResults } = req.query
    const filter = {}
    if (title) {
      filter.title = { $regex: title, $options: "i" }
    } else if (categoryId && categoryId != "0") {
      filter.categoryId = new mongoose.Types.ObjectId(String(categoryId))
    }

    const cacheKey = JSON.stringify(filter) // Unique cache key based on the filter

    // Check for cached data
    const cachedData = getCachedData(cacheKey)
    if (cachedData) {
      res.status(200).json({
        message: "searchedVideos fetched successfully!",
        items: cachedData,
      })
    } else {
      const result = await handlePromise(
        videoModel.aggregate([
          { $match: filter },
          { $sample: { size: maxResults ? Number(maxResults) : 12 } },
          {
            $project: {
              _id: 1,
              ytId: 1,
              title: 1,
              thumbnailUrl: 1,
              channelTitle: 1,
              channelAvatar: 1,
              duration: 1,
              publishedAt: 1,
              "statistics.views": 1,
            },
          },
        ]),
        req.method,
      )

      if (result.statusCode < 299) {
        setCachedData(cacheKey, result.data)
      }

      res.status(result.statusCode).json({
        message: result.message,
        items: result.data,
      })
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Bad params / invalid request", items: error })
  }
}
