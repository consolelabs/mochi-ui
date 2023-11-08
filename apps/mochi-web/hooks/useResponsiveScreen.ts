import { useState, useEffect } from 'react'

export function useResponsiveScreen() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia('(max-width: 640px)') // Adjust the breakpoint as needed

    const handleMobileChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    mobileMediaQuery.addEventListener('change', handleMobileChange)
    setIsMobile(mobileMediaQuery.matches)

    return () => {
      mobileMediaQuery.removeEventListener('change', handleMobileChange)
    }
  }, [])

  return {
    isMobile,
  }
}
