import videoModel from "../models/video.model.js"
import videoCategoryModel from "../models/videoCategory.model.js"
import {
  fetchChannel,
  fetchSearchQ,
  fetchVideos,
  fetchComments,
} from "../services/youtubeApi.js"
import main from "./main.js"

const videoCategYtObject = async () => {
  const arr = await videoCategoryModel.find({})
  const categoryObj = arr.reduce((acc, ele) => {
    acc[ele.ytId] = ele._id
    return acc
  }, {})
  return categoryObj
}

const getDuration = (ytTime) => {
  // Match parts of the duration string
  const matches = ytTime.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  // Extract hours, minutes, and seconds, or default to 0
  const hours = matches[1] ? parseInt(matches[1]) : 0
  const minutes = matches[2] ? parseInt(matches[2]) : 0
  const seconds = matches[3] ? parseInt(matches[3]) : 0

  // Format the time string
  const formattedHours = hours > 0 ? `${hours}:` : ""
  const formattedMinutes = minutes < 10 && hours > 0 ? `0${minutes}` : minutes
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`
}

const getStats = ({ viewCount, likeCount, commentCount }) => {
  return {
    views: Number(viewCount || 0),
    likes: Number(likeCount || 0),
    commentCount: Number(commentCount || 0),
  }
}

const updateVideosDBByCateg = async (videos, categId) => {
  for (const video of videos) {
    await videoModel.updateOne(
      { ytId: video.id },
      {
        $set: {
          categoryId: categId,
          title: video.snippet.localized.title,
          description: video.snippet.localized.description,
          thumbnailUrl:
            video.snippet.thumbnails.high?.url ??
            video.snippet.thumbnails.standard.url,
          videoUrl: `https://www.youtube.com/embed/${video.id}`,
          duration: getDuration(video.contentDetails.duration),
          channelYt: video.snippet.channelId,
          channelTitle: video.snippet.channelTitle,
          statistics: getStats(video.statistics),
          publishedAt: new Date(video.snippet.publishedAt),
          updatedAt: Date.now(),
        },
      },
      { upsert: true },
    )
  }
}

const updateVideosByCateg = async () => {
  const categs = await videoCategYtObject()
  for (const ids in categs) {
    const filtered = ["1", "20", "22", "24"].includes(ids)
    console.log("Updating videos of categ : ", ids)

    const searchedVideoIds = filtered
      ? ""
      : (await fetchSearchQ({ videoCategoryId: ids }))
          .map((ele) => ele.id.videoId)
          .join(",")
    // console.log(searchedVideoIds)
    const vid = await fetchVideos(
      filtered
        ? { chart: "mostPopular", videoCategoryId: ids }
        : { id: searchedVideoIds },
    )

    await updateVideosDBByCateg(vid, categs[ids])
    console.log("Updated videos of categ : ", ids)
  }
}

const getAllChannels = async () => {
  return videoModel.distinct("channelYt")
}

const setChannelAvatar = async (channels) => {
  for (const channel of channels) {
    const { medium, high } = channel.snippet.thumbnails

    await videoModel.updateMany(
      { channelYt: channel.id },
      { $set: { channelAvatar: high?.url ?? medium.url } },
    )
  }
}

const updateChannelData = async () => {
  const uniqChannels = await getAllChannels()
  for (let i = 0; i < uniqChannels.length; i += 50) {
    console.log(`updating top ${i + 50} channels`)
    const data = await fetchChannel({
      id: uniqChannels.slice(i, i + 50).join(","),
    })
    await setChannelAvatar(data)
    console.log(`updated top ${i + 50} channels`)
  }
}

const getandUpdateComments = async (ytId) => {
  try {
    const comments = (await fetchComments({ videoId: ytId })).map(
      (ele) => ele.snippet.topLevelComment.snippet,
    )

    const video = await videoModel.findOne({ ytId: ytId })

    for (const c of comments) {
      video.comments.unshift({
        username: c.authorDisplayName,
        userAvatar: c.authorProfileImageUrl,
        text: c.textDisplay,
        publishedAt: new Date(c.publishedAt),
        updatedAt: new Date(c.updatedAt),
      })
    }

    await video.save()
  } catch (err) {
    console.log(err.message)
  }
}

// main("videosByCateg", updateVideosByCateg)

// main("channelAvatar", updateChannelData)

// comments
main("comments", async () => {
  const videoIds = await videoModel.distinct("ytId")
  for (const id of videoIds) {
    console.log("\nUpdating comments of video : ", id)
    await getandUpdateComments(id)
    console.log("Updated comments of video : ", id)
  }
})
