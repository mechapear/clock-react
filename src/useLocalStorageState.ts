import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

export function useLocalStorageState<Value>(
  key: string,
  defaultValue: Value,
): [Value, Dispatch<SetStateAction<Value>>] {
  const [value, setValue] = useState<Value>(() => {
    // get initial value from localStorage
    // serialize value = value that already converted to string
    const serializedValue = localStorage.getItem(key)
    if (serializedValue) {
      return JSON.parse(serializedValue) as Value
    }
    return defaultValue
  })

  // set value to localStorage
  const setLocalStorageValue: Dispatch<SetStateAction<Value>> = useCallback(
    (newValue) => {
      setValue((prevValue) => {
        // newValue get from setState function
        const nextValue =
          typeof newValue === 'function'
            ? (newValue as unknown as (s: Value) => Value)(prevValue)
            : newValue

        // save to localStorage, value must be string
        localStorage.setItem(key, JSON.stringify(nextValue))
        return nextValue
      })
    },
    [key],
  )

  return useMemo(
    () => [value, setLocalStorageValue],
    [setLocalStorageValue, value],
  )
}
