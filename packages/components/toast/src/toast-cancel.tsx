import * as ToastPrimitive from '@radix-ui/react-toast'
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react'
import * as Polymorphic from '@consolelabs/polymorphic'
import { AlertCancelButton, AlertCancelProps } from '@consolelabs/alert'

type PolymorphicAlertCancelButton = Polymorphic.ForwardRefComponent<
  'button',
  AlertCancelProps & ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>

const ToastCancelButton = forwardRef((props, ref) => {
  const { asChild, children, className, as = 'button', ...restProps } = props
  const alertCloseButtonProps = { asChild, children, className, as }

  return (
    <ToastPrimitive.Action {...restProps}>
      <AlertCancelButton ref={ref} {...alertCloseButtonProps} />
    </ToastPrimitive.Action>
  )
}) as PolymorphicAlertCancelButton

ToastCancelButton.displayName = 'ToastCancel'

type ToastCancelButtonProps =
  ComponentPropsWithRef<PolymorphicAlertCancelButton>

export {
  ToastCancelButton,
  type PolymorphicAlertCancelButton,
  type ToastCancelButtonProps,
}
