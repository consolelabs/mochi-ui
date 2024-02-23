import { useTheme as useInternalTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export type ActiveThemeValue = 'light' | 'dark' | undefined
export type ThemeValue = 'light' | 'dark' | 'system' | undefined

export const useTheme = () => {
  const { theme, systemTheme, ...rest } = useInternalTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fix Hydration Error
  let activeTheme: string | undefined = 'light'
  if (mounted) {
    activeTheme = theme === 'system' ? systemTheme : (theme as ThemeValue)
  }

  return {
    activeTheme: activeTheme as ActiveThemeValue,
    theme: theme as ThemeValue,
    systemTheme,
    ...rest,
  }
}
