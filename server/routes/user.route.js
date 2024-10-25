import { Router } from "express"
import {
  loginUser,
  registerUser,
  authUser,
} from "../controllers/user.controller.js"
import multer from "multer"
import { checkAutorization } from "../middlewares/token.js"
import mongoose from "mongoose"

const handleAuth = checkAutorization((decode) => {
  return mongoose.Types.ObjectId.isValid(decode.user.id)
})

const userRouter = Router()

const upload = multer()

userRouter.get("/auth", handleAuth, authUser)

userRouter.post("/signup", upload.none(), registerUser)

userRouter.post("/login", upload.none(), loginUser)

export default userRouter
