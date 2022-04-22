import { useState, useEffect, useRef } from "react";

export const useFetch = (url, _options) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  const options = useRef(_options).current // use useRef to wrap a reference value such as object/array argument which is a useEffect dependency since without it, React will think the object/array is new every time it rerenders triggering another rerender which creates an infinite loop.

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(url, { signal: controller.signal }) //fetch will now throw an AbortError if component unmounts while we are fetching data, and the catch block will catch it.
        if (!response.ok) {
          throw new Error(response.statusText) // if certain error occurs and response is not ok, this will throw the statusText down to the catch block where err.message will now be response.statusText
        }
        const json = await response.json()
        setData(json)
        setIsLoading(false)
        setError(null)

      } catch (err) {  // this only catches network errors, like not getting a response due to lack of internet, will not throw error if request params or address are wrong!
        if (err.name === "AbortError") {
          console.log('Fetching of data was aborted!')
        } else {
          setIsLoading(false)
          setError('Could not fetch data!')
          console.log(err.message)
        }
      }
    }
    fetchData()

    return () => {  //this is a cleanup function which makes sure no errors occur if calling component gets unmounted while fetching data. This will abort the fetch which takes the AbortController signal as an argument.
      controller.abort()
    }
  }, [url, options])

  return { data, isLoading, error }

}
