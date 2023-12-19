import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { AlertCloseButton, AlertCloseButtonProps } from '@mochi-ui/alert'
import * as Polymorphic from '@mochi-ui/polymorphic'

type PolymorphicToastIconButton = Polymorphic.ForwardRefComponent<
  'button',
  AlertCloseButtonProps & ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>
const ToastClose = forwardRef((props, ref) => {
  return (
    <ToastPrimitive.Close asChild>
      <AlertCloseButton {...props} ref={ref} />
    </ToastPrimitive.Close>
  )
}) as PolymorphicToastIconButton

ToastClose.displayName = ToastPrimitive.Close.displayName

type ToastCloseProps = ComponentPropsWithRef<PolymorphicToastIconButton>

export { ToastClose }
export type { PolymorphicToastIconButton, ToastCloseProps }
