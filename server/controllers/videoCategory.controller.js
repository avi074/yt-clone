import videoCategoryModel from "../models/videoCategory.model.js"
import handler from "../utils/handler.js"

const { handlePromise } = handler("VideoCategory")

/**
 * gets all the videoCategories
 * @param {import('express').Request} req Request
 * @param {import('express').Response} res Response
 *
 */
export async function getVideoCategories(req, res) {
  const result = await handlePromise(videoCategoryModel.find(), req.method)

  res.status(result.statusCode).json({
    message: result.message,
    items: result.data,
  })
}
