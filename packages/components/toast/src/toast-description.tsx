import * as ToastPrimitive from '@radix-ui/react-toast'
import * as Polymorphic from '@mochi-ui/polymorphic'
import { ComponentPropsWithRef, forwardRef } from 'react'
import { AlertDescription } from '@mochi-ui/alert'

type PolymorphicToastDescription = Polymorphic.ForwardRefComponent<
  'p',
  {
    asChild?: boolean
  }
>

const ToastDescription = forwardRef((props, ref) => {
  return (
    <ToastPrimitive.Description asChild>
      <AlertDescription {...props} ref={ref} />
    </ToastPrimitive.Description>
  )
}) as PolymorphicToastDescription

ToastDescription.displayName = 'ToastDescription'

type ToastDescriptionProps = ComponentPropsWithRef<PolymorphicToastDescription>

export { ToastDescription }
export type { ToastDescriptionProps, PolymorphicToastDescription }
