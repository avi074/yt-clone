import { model, Schema, Types } from "mongoose"

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userAvatar: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
})

const videoSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "videoCategory",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: "channel",
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  channelAvatar: {
    type: String,
    required: true,
  },
  statistics: {
    type: {
      _id: false,
      views: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
      dislikes: {
        type: Number,
        default: 0,
      },
    },
  },
  comments: [commentSchema],
  publishedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
})

const videoModel = model("video", videoSchema)

export default videoModel
