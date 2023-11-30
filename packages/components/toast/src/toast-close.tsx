import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { AlertCloseButton, AlertCloseButtonProps } from '@consolelabs/alert'
import * as Polymorphic from '@consolelabs/polymorphic'

type PolymorphicToastIconButton = Polymorphic.ForwardRefComponent<
  'button',
  AlertCloseButtonProps & ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>

const ToastClose = forwardRef((props, ref) => {
  const { children, asChild, as = 'button', className, ...restProps } = props
  const alertCloseButtonProps = { children, asChild, as, className }

  return (
    <ToastPrimitive.Close {...restProps}>
      <AlertCloseButton {...alertCloseButtonProps} ref={ref} />
    </ToastPrimitive.Close>
  )
}) as PolymorphicToastIconButton

type ToastCloseProps = ComponentPropsWithRef<PolymorphicToastIconButton>

export { ToastClose, type PolymorphicToastIconButton, type ToastCloseProps }
