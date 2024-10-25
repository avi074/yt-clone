import { config } from "dotenv"

/**
 * read-only environment variables
 */
const env = (({ parsed }) => {
  return Object.freeze({
    SERVER_PORT: parsed.PORT ?? 3000,
    MONGODB_URI: parsed.MONGO_URI ?? "mongodb://localhost:27017",
    YOUTUBE_API_KEY: parsed.YOUTUBE_API_KEY,
    ALGORITHM: parsed.ALGORITHM,
    SECRET_KEY: parsed.SECRET_KEY,
    TOKEN_SECRET_KEY: parsed.TOKEN_SECRET_KEY,
  })
})(config())

export default env
