import * as ToastPrimitive from '@radix-ui/react-toast'
import { forwardRef } from 'react'
import { toaster } from '@mochi-ui/theme'
import { Alert } from '@mochi-ui/alert'
import type { AlertProps } from '@mochi-ui/alert'
import {
  ToastProps,
  ToastRef,
  ToastViewPortProps,
  ToastViewPortRef,
} from './type'

const ToastProvider = ToastPrimitive.Provider

const ToastViewPort = forwardRef<ToastViewPortRef, ToastViewPortProps>(
  (props, ref) => {
    const { className, direction, align, ...restProps } = props
    return (
      <ToastPrimitive.Viewport
        className={toaster.toastViewPortCva({ className, direction, align })}
        ref={ref}
        {...restProps}
      />
    )
  },
)

ToastViewPort.displayName = ToastPrimitive.Viewport.displayName

const Toast = forwardRef<ToastRef, ToastProps>((props, ref) => {
  const {
    className,
    scheme,
    size,
    children,
    fullWidth,
    asChild,
    ...restProps
  } = props
  const alertProps: AlertProps = {
    className,
    scheme,
    size,
    children,
    asChild,
  }
  return (
    <ToastPrimitive.Root
      asChild
      ref={ref}
      {...restProps}
      className={toaster.toastCva({ className, fullWidth })}
    >
      <Alert {...alertProps} />
    </ToastPrimitive.Root>
  )
})

Toast.displayName = ToastPrimitive.Root.displayName

ToastViewPort.displayName = ToastPrimitive.Root.displayName

export { ToastProvider, ToastViewPort, Toast }
