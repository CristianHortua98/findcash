import { act, renderHook } from '@testing-library/react'
import { expect, test } from 'vitest'
import { useLocalStorage } from './useLocalStorage'

test('returns the initial value when storage is empty', () => {
  const { result } = renderHook(() => useLocalStorage('use-local-storage-test', []))

  expect(result.current[0]).toEqual([])
})

test('persists updates to localStorage', () => {
  const { result } = renderHook(() => useLocalStorage('use-local-storage-test', []))

  act(() => {
    result.current[1]([{ id: '1' }])
  })

  expect(
    JSON.parse(window.localStorage.getItem('use-local-storage-test'))
  ).toEqual([{ id: '1' }])
})

test('rehydrates the stored value on mount', () => {
  window.localStorage.setItem(
    'use-local-storage-test',
    JSON.stringify([{ id: '1' }])
  )

  const { result } = renderHook(() => useLocalStorage('use-local-storage-test', []))

  expect(result.current[0]).toEqual([{ id: '1' }])
})
