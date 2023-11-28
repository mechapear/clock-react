import { useEffect, useRef, useState } from 'react'
import { MoonIcon, SunIcon } from './icons.tsx'
import { useLocalStorageState } from './useLocalStorageState.ts'

function setDarkModeToRoot(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export default function App() {
  const [date, setDate] = useState(new Date())
  const [is24Hour, setIs24Hour] = useLocalStorageState('is24Hour', false)
  const [isDarkMode, setIsDarkMode] = useLocalStorageState('isDarkMode', false)
  const hasInitializedRef = useRef(false)

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

  useEffect(() => {
    // Sync the UI with the state from localStorage for the first render
    // set init theme that the user has already set a theme preference
    if (!hasInitializedRef.current) {
      setDarkModeToRoot(isDarkMode)
      hasInitializedRef.current = true
    }
  }, [isDarkMode])

  function handleChangeTheme() {
    setIsDarkMode((prevIsDarkMode) => {
      const nextIsDarkMode = !prevIsDarkMode
      // set the dark mode class to the root element
      setDarkModeToRoot(nextIsDarkMode)
      return nextIsDarkMode
    })
  }

  return (
    <>
      <div className="fixed right-5 top-5 duration-100">
        <button
          className="m-1 grid h-8 w-8 place-content-center rounded-full bg-gray-200 text-gray-900 shadow ring-1 ring-inset ring-black/10 dark:border-gray-400 dark:bg-gray-300 dark:text-gray-700"
          onClick={handleChangeTheme}
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center ">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
          {day}
        </div>
        <div className="mb-7 mt-3 text-3xl font-semibold text-gray-900 dark:text-gray-300 md:text-4xl">
          {time}
        </div>
        <div>
          <label className="relative mb-5 inline-flex cursor-pointer items-center">
            <input
              className="peer sr-only"
              type="checkbox"
              onChange={() => setIs24Hour((prevIs24Hour) => !prevIs24Hour)}
              checked={is24Hour}
            />
            <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              24-hour time
            </span>
          </label>
        </div>
      </div>
    </>
  )
}
