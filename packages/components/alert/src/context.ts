import { createContext, useContext } from 'react'
import { AlertStylesProps } from '@mochi-ui/theme'

type AlertContextValue = {
  variant: NonNullable<AlertStylesProps['variant']>
  size: NonNullable<AlertStylesProps['size']>
  scheme: NonNullable<AlertStylesProps['scheme']>
  responsive: NonNullable<AlertStylesProps['responsive']>
}

const AlertContext = createContext<AlertContextValue>({
  variant: 'default',
  size: 'md',
  scheme: 'primary',
  responsive: 'auto',
})

const useAlertContext = () => useContext(AlertContext)

export { type AlertContextValue, AlertContext, useAlertContext }
