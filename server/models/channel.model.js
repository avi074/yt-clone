import { model, Schema } from "mongoose"

const channelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    ytId: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    bannerUrl: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    videos: [{ type: Schema.Types.ObjectId, ref: "video" }],
  },
  { timestamps: true },
)

const channelModel = model("channel", channelSchema)
export default channelModel
