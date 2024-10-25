import jwt from "jsonwebtoken"
import crypto from "node:crypto"
import logger from "../utils/logger.js"
import env from "../config/env.js"

/**
 * returns the methods used for creating & verifying tokens
 */
const tokenModule = (() => {
  const { ALGORITHM, SECRET_KEY, TOKEN_SECRET_KEY } = env
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
        const token = jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: "6h" })

        const cipher = crypto.createCipheriv(ALGORITHM, key, null)
        let encryptedToken = cipher.update(token, "utf-8", "hex")
        encryptedToken += cipher.final("hex")
        return encryptedToken
      } catch (error) {
        logger.error(error.message)
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
        logger.error(error.message)
        throw error
      }
    },
  }
})()

export default tokenModule

/**
 * returns a middleware to authenticate token with callback verification function
 * @param {Function} callback -> verification function from payloads
 * @returns
 */
export function checkAutorization(callback) {
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

      if (!(token && token.length == 2 && token[0] == "ytClone")) {
        res
          .status(401)
          .json({ message: "Access Denied. No / Invalid token provided !" })
      } else {
        const decode = tokenModule.verify(token[1])

        // checks for access control or something else
        if (!callback(decode)) {
          res
            .status(403)
            .json({ message: "Access Denied. invalid token data!" })
        } else {
          req.tokenPayload = decode
          next()
        }
      }
    } catch (error) {
      res.status(400).json({ message: "invalid / expired token !" })
    }
  }
}
