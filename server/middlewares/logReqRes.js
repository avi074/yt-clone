import logger from "../utils/logger.js"

/**
 * Logs the basic information like request method
 * with their respective url & the response of the request
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export default function logReqRes(req, res, next) {
  logger.info(`[REQ] ${req.method} ${req.originalUrl}`)
  
  res.on("finish", () => {
    const msg = `[RES] ${res.statusCode} ${res.statusMessage}`
    
    if (res.statusCode < 300) {
      logger.success(msg)
    } else if (res.statusCode < 400) {
      logger.warn(msg)
    } else {
      logger.error(msg)
    }
    logger.log(`Response at ${new Date().toLocaleString()}`)
  })
  next()
}
