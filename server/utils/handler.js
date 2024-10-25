/**
 * Generic Handler for model controllers
 * @param {string} name Resource Name
 * @param {object} infoMessages InfoMessages object for custom messages
 * @returns
 */
export default function handler(name = "Resource", infoMessages = null) {
  const resInfo = {
    GET: {
      200: `${name} fetched successfully!`,
    },
    POST: {
      201: `${name} created successfully!`,
    },
    PUT: {
      200: `${name} updated successfully!`,
    },
    DELETE: {
      200: `${name} deleted successfully!`,
    },
    ERROR: {
      400: "Bad request, Please check your input!",
      401: "Unauthorized access!",
      403: "Forbidden access!",
      404: `${name} not found!`,
      409: `Conflict: ${name} already exists!`,
      422: "Unprocessable entity. Validation failed!",
      500: "Internal server error!",
    },
    ...infoMessages,
  }
  return {
    /**
     * Utility function to handle promises with different
     * HTTP codes for GET, POST, PUT, DELETE
     *
     * @param {Promise} promise
     * @param {String} method
     * @returns
     */
    handlePromise: async (promise, method) => {
      const response = {
        success: false,
        statusCode: 0,
        message: "",
        data: null,
      }

      try {
        const result = await promise // Await the promise to resolve or reject

        if (result || (Array.isArray(result) && result.length > 0)) {
          response.success = true
          response.statusCode = method.startsWith("POST") ? 201 : 200
          response.data = result
        } else {
          // If result is null, undefined, or an empty array, return 404, 400
          response.statusCode = method.startsWith("POST") ? 400 : 404
        }
      } catch (error) {
        // 422, 500 & any other error
        response.statusCode =
          error.statusCode ?? error.name == "ValidationError" ? 422 : 500
        response.data = error.message
      } finally {
        response.message =
          resInfo?.[method]?.[response.statusCode] ??
          resInfo.ERROR[response.statusCode]
      }
      return response
    },

    /**
     *
     * @returns {object} Response Custom InfoMessages
     */
    getResponseInfoMessages: () => resInfo,
  }
}
