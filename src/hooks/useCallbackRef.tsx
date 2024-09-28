import { useEffect, useMemo, useRef } from 'react'

export default function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = useRef<T | undefined>(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  return useMemo(() => ((...args: any[]) => callbackRef.current?.(...args)) as T, [])
}
