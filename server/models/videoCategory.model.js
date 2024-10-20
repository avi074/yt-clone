import { model, Schema } from "mongoose"

const videoCategorySchema = new Schema(
  {
    // category title
    title: {
      type: String,
      required: true,
    },
    // youtube videoCategory Id for further use
    ytId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
)

const videoCategoryModel = model("videoCategory", videoCategorySchema)
export default videoCategoryModel
