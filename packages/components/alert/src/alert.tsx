import { alert } from '@mochi-ui/theme'
import { useMemo, forwardRef } from 'react'
import { AlertContext, AlertContextValue } from './context'

const { alertCva } = alert

type AlertProps = Partial<AlertContextValue> & {
  children: React.ReactNode
  className?: string
  shadow?: boolean
  outline?: boolean
  paddingSize?: 'default' | 'large'
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    scheme = 'primary',
    size = 'md',
    layout = 'inline',
    outline,
    paddingSize,
    shadow,
    className,
    ...restProps
  } = props

  const contextValue = useMemo(
    () => ({
      scheme,
      layout,
      size,
    }),
    [scheme, layout, size],
  )

  return (
    <AlertContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={alertCva({
          scheme,
          size,
          shadow,
          outline,
          layout,
          paddingSize,
          className,
        })}
        {...restProps}
      />
    </AlertContext.Provider>
  )
})

export { type AlertProps, Alert }
