import { createContext, useContext } from 'react'
import { AlertStylesProps } from '@mochi-ui/theme'

type AlertContextValue = {
  size: 'md' | 'sm'
  layout: NonNullable<AlertStylesProps['layout']>
  scheme: NonNullable<AlertStylesProps['scheme']>
}

const AlertContext = createContext<AlertContextValue>({
  layout: 'auto',
  size: 'md',
  scheme: 'primary',
})

const useAlertContext = () => useContext(AlertContext)

export { type AlertContextValue, AlertContext, useAlertContext }
