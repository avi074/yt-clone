import tokenModule from "../middlewares/token.js"
import handler from "../utils/handler.js"
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"

const { handlePromise } = handler("User", {
  POST_SIGNUP: { 201: "User registered successfully!" },
  POST_LOGIN: { 201: "User logged in successfully!" },
})

/**
 * registers the user in db with respective data
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  let result

  result = await handlePromise(userModel.findOne({ email: email }), req.method)

  if (result.success) {
    res.status(400).json({ message: "Email already exists, please log-in!" })
  } else {
    const hashPassword = bcrypt.hashSync(password, 8)

    const newUser = new userModel({
      username: username,
      email: email,
      password: hashPassword,
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${username}&radius=50`,
    })

    result = await handlePromise(newUser.save(), "POST_SIGNUP")

    res.status(result.statusCode).json({
      message: result.message,
      data: !result.success && result.data,
    })
  }
}

/**
 * checks for user credential for logging in &
 * generates an access token for further use
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body

  const result = await handlePromise(
    userModel.findOne({ email: email }),
    "POST_LOGIN",
  )
  let accessToken = null

  if (result.success) {
    const { password: userPassword } = result.data
    if (bcrypt.compareSync(password, userPassword)) {
      const token = tokenModule.create({
        user:{
          id: result.data._id
        },
      })
      accessToken = token
    } else {
      return res.status(403).json({ message: "Invalid credentials !" })
    }
  }
  res.status(result.statusCode).json({
    message: result.message,
    accessToken: accessToken,
    data: !result.success && result.data,
  })
}

const authUser = async (req, res) => {
  const { user } = req.tokenPayload
  const result = await handlePromise(userModel.findById(user.id, {password:0}), req.method)
  res.status(result.statusCode).json({
    message: result.message,
    data: result.data,
  })
}

export { registerUser, loginUser, authUser }
