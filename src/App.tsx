import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from './icons.tsx'

// user preference information from local storage
const userPreferenceStorage = {
  time: {
    key: 'time',
    getIs24Hour: () => {
      return localStorage.getItem(userPreferenceStorage.time.key) === '24'
    },
    setIs24Hour: (is24Hour: boolean) => {
      localStorage.setItem(
        userPreferenceStorage.time.key,
        is24Hour ? '24' : '12',
      )
    },
  },
  theme: {
    key: 'theme',
    getIsDarkMode: () => {
      return localStorage.getItem(userPreferenceStorage.theme.key) === 'dark'
    },
    setIsDarkMode: (isDarkMode: boolean) => {
      localStorage.setItem(
        userPreferenceStorage.theme.key,
        isDarkMode ? 'dark' : 'light',
      )
    },
  },
}

function initTheme() {
  const isDarkMode = userPreferenceStorage.theme.getIsDarkMode()
  if (isDarkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  return { isDarkMode }
}

function setDarkModeToRoot(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  userPreferenceStorage.theme.setIsDarkMode(isDark)
}

export default function App() {
  const [date, setDate] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(() => {
    // check if the user has already set a clock format preference
    return userPreferenceStorage.time.getIs24Hour()
  })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // check if the user has already set a theme preference
    return initTheme().isDarkMode
  })

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

  function handleChangeTheme() {
    setIsDarkMode((prevIsDarkMode) => {
      const nextIsDarkMode = !prevIsDarkMode
      // set the dark mode class to the root element
      setDarkModeToRoot(nextIsDarkMode)
      return nextIsDarkMode
    })
  }

  function handleChangeTimeFormat() {
    setIs24Hour((prevIs24Hour) => {
      // set state from the latest value of is24Hour pasing function inside setIs24Hour
      const nextIs24Hour = !prevIs24Hour
      // set the time format to the local storage
      userPreferenceStorage.time.setIs24Hour(nextIs24Hour)
      return nextIs24Hour
    })
  }

  return (
    <>
      <div className="fixed top-5 right-5 duration-100">
        <button
          className="w-8 h-8 m-1 bg-gray-200 dark:bg-gray-300 text-gray-900 dark:text-gray-700 dark:border-gray-400 grid place-content-center rounded-full ring-1 ring-inset ring-black/10 shadow"
          onClick={handleChangeTheme}
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <div className="text-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
          {day}
        </div>
        <div className="text-3xl md:text-4xl font-semibold mt-3 mb-7 text-gray-900 dark:text-gray-300">
          {time}
        </div>
        <div>
          <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              onChange={handleChangeTimeFormat}
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
