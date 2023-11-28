import { createContext, useContext } from 'react'
import { AlertStylesProps } from '@consolelabs/theme'

type AlertContextValue = {
  variant: NonNullable<AlertStylesProps['variant']>
  size: NonNullable<AlertStylesProps['size']>
  scheme: NonNullable<AlertStylesProps['scheme']>
}

const AlertContext = createContext<AlertContextValue>({
  variant: 'default',
  size: 'md',
  scheme: 'primary',
})

const useAlertContext = () => useContext(AlertContext)

export { type AlertContextValue, AlertContext, useAlertContext }
