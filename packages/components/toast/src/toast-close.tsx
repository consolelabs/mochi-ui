import { ElementRef, forwardRef } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { AlertCloseButton, AlertCloseButtonProps } from '@mochi-ui/alert'

type ToastCloseProps = AlertCloseButtonProps

const ToastClose = forwardRef<
  ElementRef<typeof AlertCloseButton>,
  ToastCloseProps
>((props, ref) => {
  return (
    <ToastPrimitive.Close asChild>
      <AlertCloseButton {...props} ref={ref} />
    </ToastPrimitive.Close>
  )
})

ToastClose.displayName = ToastPrimitive.Close.displayName

export { ToastClose }
export type { ToastCloseProps }
