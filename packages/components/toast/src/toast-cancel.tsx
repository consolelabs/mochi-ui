import * as ToastPrimitive from '@radix-ui/react-toast'
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react'
import * as Polymorphic from '@mochi-ui/polymorphic'
import { AlertCancelButton, AlertCancelProps } from '@mochi-ui/alert'

type PolymorphicToastCancelButton = Polymorphic.ForwardRefComponent<
  'button',
  AlertCancelProps & ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>

const ToastCancelButton = forwardRef((props, ref) => {
  const { altText, ...restProps } = props

  return (
    <ToastPrimitive.Action asChild altText={altText}>
      <AlertCancelButton ref={ref} {...restProps} />
    </ToastPrimitive.Action>
  )
}) as PolymorphicToastCancelButton

ToastCancelButton.displayName = 'ToastCancelButton'

type ToastCancelButtonProps =
  ComponentPropsWithRef<PolymorphicToastCancelButton>

export {
  ToastCancelButton,
  type PolymorphicToastCancelButton,
  type ToastCancelButtonProps,
}
