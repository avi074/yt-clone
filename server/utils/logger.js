// @ts-nocheck
import colors from "colors"

/**
 * @param {string} msg
 */
const showMessage = (msg) => {
  console.log(`${new Date().toLocaleTimeString().italic} ${msg}`.bold)
}

const logger = {
  /**
   * @param {string} message
   */
  info: (message) => {
    showMessage(`[INFO] ${message}`.blue)
  },
  /**
   * @param {string} message
   */
  success: (message) => {
    showMessage(`[SUCCESS] ${message}`.green)
  },
  /**
   * @param {string} message
   */
  error: (message) => {
    showMessage(`[ERROR] ${message}`.red)
  },

  /**
   * @param {string} message
   */
  warn: (message) => {
    showMessage(`[WARN] ${message}`.yellow)
  },

  /**
   * @param {string} message
   */
  log: (message) => {
    showMessage(`[LOG] ${message}`)
  },
}

export default logger
