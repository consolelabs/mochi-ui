import { useTheme as useInternalTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const useTheme = () => {
  const { theme, systemTheme, ...rest } = useInternalTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return {
    activeTheme: theme === 'system' ? systemTheme : theme,
    theme,
    systemTheme,
    isLoadedTheme: mounted,
    ...rest,
  }
}
