import { alert } from '@consolelabs/theme'
import { useMemo } from 'react'
import { AlertContext, AlertContextValue } from './context'

const { alertCva } = alert

type AlertProps = Partial<AlertContextValue> & {
  children: React.ReactNode
  className?: string
}

export default function Alert(props: AlertProps) {
  const {
    scheme = 'primary',
    variant = 'default',
    size = 'md',
    responsive = 'auto',
    className,
    ...restProps
  } = props

  const contextValue = useMemo(
    () => ({
      scheme,
      variant,
      size,
      responsive,
    }),
    [scheme, responsive, size, variant],
  )

  return (
    <AlertContext.Provider value={contextValue}>
      <div
        className={alertCva({ scheme, size, variant, responsive, className })}
        {...restProps}
      />
    </AlertContext.Provider>
  )
}

export { type AlertProps }
