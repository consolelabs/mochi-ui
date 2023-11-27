import { createContext, useContext } from 'react'
import { AlertStylesProps } from '@consolelabs/theme'

type AlertContextValue = AlertStylesProps & {
  status?: 'info' | 'success' | 'danger' | 'warning'
}

const AlertContext = createContext<AlertContextValue>({})

const useAlertContext = () => useContext(AlertContext)

export { type AlertContextValue, AlertContext, useAlertContext }
