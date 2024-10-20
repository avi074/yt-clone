import { useState, useEffect } from "react"
import axios from "axios"

/**
 *
 * @param {string} url
 * @param {Object} urlParams
 * @returns
 */
const useFetch = (url, urlParams) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    setLoading(true)
    setError(null)

    axios
      .get(url, {
        params: urlParams,
      })
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [url, urlParams])

  return { data, loading, error }
}

export default useFetch
