import './App.css'
import { useEffect, useState } from 'react'

export default function App() {
  const [date, setDate] = useState(new Date())

  const day = date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const time = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <>
      <div>{day}</div>
      <div>{time}</div>
    </>
  )
}
