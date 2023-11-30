import * as ToastPrimitive from '@radix-ui/react-toast'
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react'
import {
  AlertConfirmProps,
  AlertConfirmButton,
} from '@consolelabs/alert/src/alert-confirm'
import * as Polymorphic from '@consolelabs/polymorphic'

type PolymorphicAlertConfirmButton = Polymorphic.ForwardRefComponent<
  'button',
  AlertConfirmProps & ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>

const ToastConfirmButton = forwardRef((props, ref) => {
  const { asChild, children, className, as = 'button', ...restProps } = props
  const alertCloseButtonProps = { asChild, children, className, as }
  return (
    <ToastPrimitive.Action {...restProps}>
      <AlertConfirmButton ref={ref} {...alertCloseButtonProps} />
    </ToastPrimitive.Action>
  )
}) as PolymorphicAlertConfirmButton

ToastConfirmButton.displayName = 'ToastConfirmButton'

type ToastConfirmProps = ComponentPropsWithRef<PolymorphicAlertConfirmButton>

export {
  ToastConfirmButton,
  type ToastConfirmProps,
  type PolymorphicAlertConfirmButton,
}
