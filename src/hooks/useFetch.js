import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(response.statusText) // if certain error occurs and response is not ok, this will throw the statusText down to the catch block where err.message will now be response.statusText
        }
        const json = await response.json()
        setData(json)
        setIsLoading(false)
        setError(null)

      } catch (err) {  // this only catches network errors, like not getting a response due to lack of internet, will not throw error if request params or address are wrong!
        setIsLoading(false)
        setError('Could not fetch data!')
        console.log(err.message)

      }


    }

    fetchData()
  }, [url])

  return { data, isLoading, error }

}
