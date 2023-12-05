import * as ToastPrimitive from '@radix-ui/react-toast'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { ViewPortStyleProps, toast } from '@mochi-ui/theme'
import { Alert } from '@mochi-ui/alert'
import type { AlertProps } from '@mochi-ui/alert'

type ToastViewPortProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Viewport
> &
  ViewPortStyleProps

type ToastViewPortRef = ElementRef<typeof ToastPrimitive.Viewport>

type ToastProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
  AlertProps

type ToastRef = ElementRef<typeof ToastPrimitive.Root>

const ToastProvider = ToastPrimitive.Provider

const ToastViewPort = forwardRef<ToastViewPortRef, ToastViewPortProps>(
  (props, ref) => {
    const { className, direction, ...restProps } = props
    return (
      <ToastPrimitive.Viewport
        className={toast.toastViewPortCva({ className, direction })}
        ref={ref}
        {...restProps}
      />
    )
  },
)

ToastViewPort.displayName = ToastPrimitive.Viewport.displayName

const Toast = forwardRef<ToastRef, ToastProps>((props, ref) => {
  const { className, scheme, size, children, ...restProps } = props
  const alertProps: AlertProps = {
    className,
    scheme,
    size,
    children,
  }
  return (
    <ToastPrimitive.Root
      asChild
      ref={ref}
      {...restProps}
      className={toast.toastClsx({ className })}
    >
      <Alert {...alertProps} />
    </ToastPrimitive.Root>
  )
})

ToastViewPort.displayName = ToastPrimitive.Root.displayName

export { ToastProvider, ToastViewPort, Toast }
export type { ToastViewPortProps, ToastViewPortRef, ToastProps, ToastRef }
