import * as ToastPrimitive from '@radix-ui/react-toast'
import { forwardRef } from 'react'
import { toast } from '@consolelabs/theme'
import {
  ToastActionProps,
  ToastActionRef,
  ToastProps,
  ToastRef,
  ToastViewPortProps,
  ToastViewPortRef,
  ToastTitleProps,
  ToastTitleRef,
} from './type'

const ToastProvider = ToastPrimitive.Provider

const ToastViewPort = forwardRef<ToastViewPortRef, ToastViewPortProps>(
  (props, ref) => {
    const { className, ...restProps } = props
    return (
      <ToastPrimitive.Viewport
        className={toast.toastViewPortCva({ className })}
        ref={ref}
        {...restProps}
      />
    )
  },
)

const Toast = forwardRef<ToastRef, ToastProps>((props, ref) => {
  const { className, ...restProps } = props

  return <ToastPrimitive.Root className={className} ref={ref} {...restProps} />
})
const ToastAction = forwardRef<ToastActionRef, ToastActionProps>(
  (props, ref) => {
    return <ToastPrimitive.Action ref={ref} {...props} />
  },
)
const ToastTitle = forwardRef<ToastTitleRef, ToastTitleProps>((props, ref) => {
  return <ToastPrimitive.Title ref={ref} {...props} />
})

export { ToastProvider, ToastViewPort, Toast, ToastAction, ToastTitle }
