export const ytEndpointConfig = {
  search: {
    part:'id',
    q: "",
    type: 'video',
    videoEmbeddable:'true',
    maxResults: 5,
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
  comments: {
    part: "snippet",
    textFormat: "plainText",
    maxResults: 20,
  },
  // Add more endpoints as needed
}
