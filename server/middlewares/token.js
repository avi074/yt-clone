import jwt from "jsonwebtoken"
import { config } from "dotenv"
import crypto from "node:crypto"

/**
 * returns the methods used for creating & verifying tokens
 */
const tokenModule = (({
  parsed: { ALGORITHM, SECRET_KEY, TOKEN_SECRET_KEY },
}) => {
  const key = Buffer.from(SECRET_KEY, "hex")
  return {
    /**
     * Creates an encrypted JWT token from payload
     * @param {string | Buffer | Object} payload - data to be encrypted in token
     * @returns {string} encryptedToken
     */
    create: (payload) => {
      try {
        // creating a jwt token
        const token = jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: "1h" })

        const cipher = crypto.createCipheriv(ALGORITHM, key, null)
        let encryptedToken = cipher.update(token, "utf-8", "hex")
        encryptedToken += cipher.final("hex")
        return encryptedToken
      } catch (error) {
        console.error(error.message)
        throw error
      }
    },

    /**
     * decryptes the encryptedToken & then
     * verify the token & return the embedded data
     * @param {string} encryptedToken - encryptedToken for getting payload data
     * @returns {string | jwt.JwtPayload} token's payload data
     */
    verify: (encryptedToken) => {
      try {
        const decipher = crypto.createDecipheriv(ALGORITHM, key, null)
        let token = decipher.update(encryptedToken, "hex", "utf-8")
        token += decipher.final("utf-8")
        const data = jwt.verify(token, TOKEN_SECRET_KEY)
        return data
      } catch (error) {
        console.error(error.message)
        throw error
      }
    },
  }
})(config())

export default tokenModule

/**
 * returns a middleware to authenticate token with callback verification function
 * @param {Function} callback -> verification function from payloads
 * @returns
 */
export function checkAutorizationAndRole(callback) {
  /**
   * Handles the authentication of the user via jwt_token
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   * @returns
   */
  return function (req, res, next) {
    try {
      // fetches the token from headers
      const token = req.headers?.authorization?.split(" ")

      if (!(token && token.length == 2 && token[0] == "shoppyglobe_jwt")) {
        return res
          .status(401)
          .json({ message: "Access Denied. No / Invalid token provided !" })
      }

      const decode = tokenModule.verify(token[1])

      // checks for access control or something else
      if (!callback(decode)) {
        return res
          .status(403)
          .json({ message: "Access Denied. invalid token data!" })
      }
      req.tokenPayload = decode
      next()
    } catch (error) {
      return res.status(400).json({ message: "invalid / expired token !" })
    }
  }
}
