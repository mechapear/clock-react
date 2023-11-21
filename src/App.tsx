import './App.css'
import { useEffect, useState } from 'react'

export default function App() {
  const [date, setDate] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(false)

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
    hour12: !is24Hour,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div>{day}</div>
      <div>{time}</div>
      <div>
        <input
          type="checkbox"
          // set state from the latest value of is24Hour pasing function inside setIs24Hour
          onChange={() => setIs24Hour((prevIs24Hour) => !prevIs24Hour)}
          checked={is24Hour}
        />
        <label>24-hour time</label>
      </div>
    </>
  )
}
