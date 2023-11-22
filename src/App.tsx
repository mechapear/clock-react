import { useEffect, useState } from 'react'

export default function App() {
  const [date, setDate] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(false)

  const day = date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
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
      <div className="text-center">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
          {day}
        </div>
        <div className="text-4xl font-semibold mt-3 mb-7 text-gray-900 dark:text-gray-300">
          {time}
        </div>
        <div>
          <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              // set state from the latest value of is24Hour pasing function inside setIs24Hour
              onChange={() => setIs24Hour((prevIs24Hour) => !prevIs24Hour)}
              checked={is24Hour}
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              24-hour time
            </span>
          </label>
        </div>
      </div>
    </>
  )
}
