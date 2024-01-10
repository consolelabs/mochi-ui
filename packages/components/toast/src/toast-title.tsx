import { AlertTitle, AlertTitleProps } from '@mochi-ui/alert'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { ElementRef, forwardRef } from 'react'

type ToastTitleProps = AlertTitleProps

const ToastTitle = forwardRef<ElementRef<typeof AlertTitle>, ToastTitleProps>(
  (props, ref) => {
    return (
      <ToastPrimitive.Title asChild>
        <AlertTitle ref={ref} {...props} />
      </ToastPrimitive.Title>
    )
  },
)

ToastTitle.displayName = ToastPrimitive.Title.displayName

export { ToastTitle, type ToastTitleProps }
