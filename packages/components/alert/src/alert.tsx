import { alert } from '@mochi-ui/theme'
import { useMemo, forwardRef, ComponentPropsWithoutRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { AlertContext, AlertContextValue } from './context'

const { alertCva } = alert

type AlertProps = Partial<AlertContextValue> & {
  children: React.ReactNode
  className?: string
  shadow?: boolean
  outline?: boolean
  paddingSize?: 'default' | 'large'
  asChild?: boolean
} & ComponentPropsWithoutRef<'div'>

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    scheme = 'primary',
    size = 'md',
    layout = 'auto',
    outline,
    paddingSize,
    shadow,
    className,
    asChild,
    ...restProps
  } = props

  const Component = asChild ? Slot : 'div'

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
      <Component
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

Alert.displayName = 'Alert'

export { type AlertProps, Alert }
