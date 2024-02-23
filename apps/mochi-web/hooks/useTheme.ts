import { useTheme as useInternalTheme } from 'next-themes'

export const useTheme = () => {
  const { theme, systemTheme, ...rest } = useInternalTheme()
  return {
    activeTheme: theme === 'system' ? systemTheme : theme,
    theme,
    systemTheme,
    ...rest,
  }
}
