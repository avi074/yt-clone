import { config } from "dotenv"

config({ path: ".env.development" })

const env = Object.freeze({
  SERVER_PORT: process.env.PORT ?? 3000,
  MONGODB_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017",
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
})

export default env
