/**
 * Params with respect to Youtube Endpoint for custom db-updates
 */
export const ytEndpointConfig = {
  search: {
    part: "id",
    q: "",
    type: "video",
    videoEmbeddable: "true",
    maxResults: 50,
    regionCode: "IN",
  },
  videoCategories: {
    part: "snippet",
    regionCode: "IN",
  },
  videos: {
    part: "snippet,contentDetails,statistics",
    regionCode: "IN",
    maxResults: 50,
  },
  commentThreads: {
    part: "snippet",
    textFormat: "plainText",
    maxResults: 20,
  },
  channels: {
    part: "snippet",
  },
  // Add more endpoints as needed
}
