/**
 * @param key -> name of the KEY you want to get the value of
 * @returns -> KEYs value
 */
const getItem = <T>(key: string): T | undefined => {
  try {
    const serializedState = localStorage?.getItem(key)
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

/**
 * @param key -> name of the key you want to SET the value of
 * @returns -> boolean
 */
const setItem = <T>(key: string, value: T): boolean => {
  try {
    const serializedState = JSON.stringify(value)
    localStorage?.setItem(key, serializedState)
    return true
  } catch (error) {
    return false
  }
}

/**
 * @param key -> name of the key you want to REMOVE
 * @returns -> undefined
 */
const removeItem = (key: string): undefined => {
  try {
    localStorage?.removeItem(key)
  } catch (error) {
    return undefined
  }
}

/**
 * Remove all items from local storage
 */
const clear = async () => {
  try {
    if (typeof window !== 'undefined') {
      await localStorage?.clear()
    }
  } catch (err) {
    return undefined
  }
}

export {
  getItem,
  setItem,
  removeItem,
  clear,
}
