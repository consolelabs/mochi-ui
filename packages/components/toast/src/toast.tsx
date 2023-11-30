import * as ToastPrimitive from '@radix-ui/react-toast'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { ViewPortStyleProps, toast } from '@consolelabs/theme'
import { Alert } from '@consolelabs/alert'
import type { AlertProps } from '@consolelabs/alert'

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
    const { className, position, ...restProps } = props
    return (
      <ToastPrimitive.Viewport
        className={toast.toastViewPortCva({ className, position })}
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
    variant,
    size,
    responsive,
    children,
    ...restProps
  } = props
  const alertProps: AlertProps = {
    className,
    scheme,
    variant,
    size,
    responsive,
    children,
  }
  return (
    <ToastPrimitive.Root asChild ref={ref} {...restProps}>
      <Alert {...alertProps} />
    </ToastPrimitive.Root>
  )
})

ToastViewPort.displayName = ToastPrimitive.Root.displayName

export { ToastProvider, ToastViewPort, Toast }
export type { ToastViewPortProps, ToastViewPortRef, ToastProps, ToastRef }
