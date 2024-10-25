import fs from "fs-extra"
import channelModel from "../models/channel.model.js"
import handler from "../utils/handler.js"
import path from "path"
import userModel from "../models/user.model.js"

const { handlePromise } = handler("channel")

/**
 * renames the file
 * @param {object} file file to rename
 * @param {string} finalDir finalDir name
 * @param {string} finalFilePath final file name
 */
const renameFile = async (file, finalDir, finalFilePath) => {
  const tempFilePath = file.path // Path of the temporarily saved file
  const tempDir = path.dirname(tempFilePath) // Temp directory path
  // Ensure the final directory exists
  await fs.ensureDir(tempDir)

  // Rename the temporary directory to the final directory (for channelId)
  await fs.rename(tempDir, finalDir)

  await fs.rename(path.join(finalDir, file.originalname), finalFilePath)
}

/**
 * Fetch Channel Information
 * @param {import('express').Request} req Request
 * @param {import('express').Response} res Response
 *
 */
export async function getChannel(req, res) {
  const { id } = req.params
  const result = await handlePromise(channelModel.findById(id), req.method)
  res.status(result.statusCode).json({
    message: result.message,
    items: result.data,
  })
}
/**
 * Creates new channel
 * @param {import('express').Request} req Request
 * @param {import('express').Response} res Response
 *
 */
export async function createChannel(req, res) {
  const { user } = req.tokenPayload
  const { title, description } = req.body
  try {
    const currUser = await userModel.findById(user.id)

    const newChannel = new channelModel({
      title: title,
      description: description,
      owner: user.id,
    })

    // currUser.channels.push(newChannel._id)
    const channelId = newChannel._id.toString()
    const finalDir = path.join(
      process.cwd(),
      "uploads",
      user.id,
      newChannel._id.toString(),
    )

    const finalFilePath = path.join(
      finalDir,
      "channelImage" + path.extname(req.file.originalname),
    )

    renameFile(req.file, finalDir, finalFilePath)

    newChannel.avatar = `http://localhost:3000/uploads/${user.id}/${
      newChannel._id
    }/channelImage${path.extname(req.file.originalname)}`

    const result = await handlePromise(
      Promise.all([newChannel.save(), currUser.save()]),
      req.method,
    )

    res.status(result.statusCode).json({
      message: result.message,
      data: result.success ? channelId : result.data,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error in creating Channel",
      data: error,
    })
  }
}
