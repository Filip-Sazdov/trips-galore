import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true)
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
      setIsLoading(false)
    }

    fetchData()
  }, [url])

  return { data, isLoading }

}
