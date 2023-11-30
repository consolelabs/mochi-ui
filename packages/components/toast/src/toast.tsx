import * as ToastPrimitive from '@radix-ui/react-toast'
import { ReactElement, forwardRef } from 'react'
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
  ToastDescriptionProps,
  ToastDescriptionRef,
  ToastCloseRef,
  ToastCloseProps,
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

const ToastDescription = forwardRef<ToastDescriptionRef, ToastDescriptionProps>(
  (props, ref) => {
    return <ToastPrimitive.Description ref={ref} {...props} />
  },
)

const ToastClose = forwardRef<ToastCloseRef, ToastCloseProps>((props, ref) => {
  return <ToastPrimitive.Close ref={ref} {...props} />
})

type ToastActionElement = ReactElement<typeof ToastAction>

export {
  ToastProvider,
  ToastViewPort,
  Toast,
  ToastAction,
  ToastTitle,
  ToastDescription,
  ToastClose,
  type ToastActionElement,
}
