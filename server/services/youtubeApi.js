import callYouTubeAPI from "./youtubeApiService.js"

// Specialized functions for each YouTube API endpoint

/**
 * Fetches search results from the YouTube API using the 'search' endpoint.
 *
 * @function fetchSearchQ
 * @param {Object} [params={}] The user-defined parameters to override the defaults.
 * @returns {Promise<Object>} A promise that resolves to the search results from the YouTube API.
 * @throws Throws an error if the fetch operation fails.
 */
const fetchSearchQ = callYouTubeAPI.bind(null, "search")

const fetchVideoCategories = callYouTubeAPI.bind(null, "videoCategories")
const fetchVideos = callYouTubeAPI.bind(null, "videos")
const fetchChannel = callYouTubeAPI.bind(null, "channel")
const fetchComments = callYouTubeAPI.bind(null, "comments")

export { fetchSearchQ, fetchVideoCategories, fetchVideos, fetchComments }
