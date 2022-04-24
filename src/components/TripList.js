import { useState } from 'react'
import { useFetch } from "../hooks/useFetch";


import './TripList.css'

export default function TripList() {

  const [url, setUrl] = useState('http://localhost:3000/trips')

  const { data: trips, isLoading, error } = useFetch(url, { type: 'GET' }) // using  { type: 'GET' } just to show that we need useRef in useFetch to make sure we avoid infinite loop since react will think the options object of useFetch is brand new every time it rerenders resulting in infinite loop rerenders. useRef makes said object persist thus preventing rerenders.

  return (
    <div className='trip-list'>
      <h2>Trip List</h2>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <ul>
        {trips && trips.map(trip => (
          <li key={trip.id}>
            <h3>{trip.title}</h3>
            <p>{trip.price}</p>
          </li>
        ))}
      </ul>
      <div className="filters">
        <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}>European Trips</button>
        <button onClick={() => setUrl('http://localhost:3000/trips')}>All Trips</button>
      </div>
    </div>
  )
}
