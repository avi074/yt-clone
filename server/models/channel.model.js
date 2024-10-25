import { model, Schema } from "mongoose"

const channelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
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
