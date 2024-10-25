import videoModel from "../models/video.model.js"
import handler from "../utils/handler.js"

const { handlePromise } = handler("Videos")

/**
 * gets video details by id
 * @param {import('express').Request} req Request
 * @param {import('express').Response} res Response
 *
 */
export async function getVideoById(req, res) {
  const { id } = req.params
  const result = await handlePromise(videoModel.findById(id), req.method)

  res.status(result.statusCode).json({
    message: result.message,
    items: result.data,
  })
}
