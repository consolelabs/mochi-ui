import * as ToastPrimitive from '@radix-ui/react-toast'
import { ElementRef, forwardRef } from 'react'
import { AlertDescription, AlertDescriptionProps } from '@mochi-ui/alert'

type ToastDescriptionProps = AlertDescriptionProps

const ToastDescription = forwardRef<
  ElementRef<typeof AlertDescription>,
  ToastDescriptionProps
>((props, ref) => {
  return (
    <ToastPrimitive.Description asChild>
      <AlertDescription {...props} ref={ref} />
    </ToastPrimitive.Description>
  )
})

ToastDescription.displayName = 'ToastDescription'

export { ToastDescription }
export type { ToastDescriptionProps }
