import { model, Schema } from "mongoose"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
    channels: [{ type: Schema.Types.ObjectId, ref: "channel" }],
    likedVideos: [{ type: Schema.Types.ObjectId, ref: "video" }],
    dislikedVideos: [{ type: Schema.Types.ObjectId, ref: "video" }],
  },
  { timestamps: true },
)

const userModel = model("user", userSchema)
export default userModel
