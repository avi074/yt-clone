import logger from "../utils/logger.js"

/**
 * Starts the server & handles the error
 * @param {import('express').Express} app Express Application
 * @param {Number} port Server Port
 */
const startServer = (app, port) => {
  const server = app.listen(port, () => {
    console.log(new Date().toLocaleDateString())
    logger.log(`Server running on port ${port}`)
  })

  server.on("error", (err) => {
    // if port is in us
    // @ts-ignore
    if (err.code === "EADDRINUSE") {
      logger.error(`Port ${port} is already in use. Trying a different port...`)
      startServer(app, port + 1) // Retry with the next port
    } else {
      logger.error(`Server error: ${err}`)
    }
  })
}

export default startServer
