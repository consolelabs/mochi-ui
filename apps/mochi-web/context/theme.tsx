import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { createContext } from '@dwarvesf/react-utils'

interface ThemeContextValue {
  theme: 'light' | 'dark'
  setTheme: (_: 'light' | 'dark') => void
}

const [ThemeContextProvider, useTheme] = createContext<ThemeContextValue>({})

interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: 'light' | 'dark'
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, defaultTheme = 'light' } = props
  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme)

  const pickTheme = useCallback((t: 'light' | 'dark') => {
    setTheme(t)
    window.document
      .getElementsByTagName('html')[0]
      .setAttribute('data-theme', t)
  }, [])

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme: pickTheme,
    }),
    [theme, pickTheme],
  )

  return (
    <ThemeContextProvider value={contextValue}>{children}</ThemeContextProvider>
  )
}

export { ThemeProvider, useTheme }
