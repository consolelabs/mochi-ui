import * as ToastPrimitive from '@radix-ui/react-toast'
import * as Polymorphic from '@consolelabs/polymorphic'
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react'
import { AlertDescription, AlertDescriptionProps } from '@consolelabs/alert'

type PolymorphicToastDescription = Polymorphic.ForwardRefComponent<
  'p',
  ComponentPropsWithoutRef<typeof ToastPrimitive.Description> &
    AlertDescriptionProps
>

const ToastDescription = forwardRef((props, ref) => {
  const { children, asChild, className, as = 'p', ...restProps } = props

  const alertDescriptionProps = { children, asChild, className, as }
  return (
    <ToastPrimitive.Description {...restProps} asChild>
      <AlertDescription {...alertDescriptionProps} ref={ref} />
    </ToastPrimitive.Description>
  )
}) as PolymorphicToastDescription

ToastDescription.displayName = 'ToastDescription'

export type ToastDescriptionProps =
  ComponentPropsWithRef<PolymorphicToastDescription>

export { ToastDescription }
