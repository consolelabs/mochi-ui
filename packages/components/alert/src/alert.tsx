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
    status = 'info',
    scheme: schemeProp,
    variant = 'default',
    size,
    className,
    ...restProps
  } = props

  const scheme =
    schemeProp ??
    ({
      info: 'neutral',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
    }[status] as NonNullable<AlertProps['scheme']>)

  const contextValue = useMemo(
    () => ({
      status,
      scheme,
      variant,
      size,
    }),
    [scheme, size, status, variant],
  )

  return (
    <AlertContext.Provider value={contextValue}>
      <div
        className={alertCva({ scheme, size, variant, className })}
        {...restProps}
      />
    </AlertContext.Provider>
  )
}

export { type AlertProps }
