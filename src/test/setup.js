import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Some Node/jsdom combinations expose a window without a localStorage
// implementation (Node's own experimental localStorage does not apply to
// jsdom). Provide an in-memory fallback so tests stay deterministic.
if (!window.localStorage) {
  const store = new Map()

  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    writable: true,
    value: {
      getItem: (key) => (store.has(String(key)) ? store.get(String(key)) : null),
      setItem: (key, value) => {
        store.set(String(key), String(value))
      },
      removeItem: (key) => {
        store.delete(String(key))
      },
      clear: () => {
        store.clear()
      },
      key: (index) => Array.from(store.keys())[index] ?? null,
      get length() {
        return store.size
      },
    },
  })
}

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})
