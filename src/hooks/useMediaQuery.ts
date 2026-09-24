import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
  )
}

// Узкий экран или телефон в альбомной ориентации.
export const MOBILE_LAYOUT_QUERY = '(max-width: 767px), (pointer: coarse) and (max-height: 500px)'

export const useIsMobileLayout = () => useMediaQuery(MOBILE_LAYOUT_QUERY)
