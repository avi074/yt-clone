import { useState, useEffect } from "react"

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

    fetch(url, {
      method: "GET",
      ...urlParams,
    })
      .then((res) => res.json())
      .then(data => setData(data.items))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

export default useFetch
