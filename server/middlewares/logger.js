/**
 * Logs the basic information like request method
 * with their respective url & the response of the request
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export default function logger(req, res, next) {
  console.log(
    `\n\x1b[33m ${req.method} Request with URL : ${req.originalUrl} \x1b[0m`,
  )
  res.on("finish", () => {
    console.log(
      `\x1b[36m Request ended with status : ${`${
        res.statusCode > 399 ? "\x1b[31m" : "\x1b[32m"
      } ${res.statusCode} ${res.statusMessage}`} \x1b[0m`,
    )
  })
  next()
}
