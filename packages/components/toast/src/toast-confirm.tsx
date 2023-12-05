import * as ToastPrimitive from '@radix-ui/react-toast'
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react'
import {
  AlertConfirmProps,
  AlertConfirmButton,
} from '@mochi-ui/alert/src/alert-confirm'
import * as Polymorphic from '@mochi-ui/polymorphic'

type PolymorphicToastConfirmButton = Polymorphic.ForwardRefComponent<
  'button',
  AlertConfirmProps & ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>

const ToastConfirmButton = forwardRef((props, ref) => {
  const { altText, ...restProps } = props
  return (
    <ToastPrimitive.Action altText={altText} asChild>
      <AlertConfirmButton ref={ref} {...restProps} />
    </ToastPrimitive.Action>
  )
}) as PolymorphicToastConfirmButton

ToastConfirmButton.displayName = 'ToastConfirmButton'

type ToastConfirmProps = ComponentPropsWithRef<PolymorphicToastConfirmButton>

export { ToastConfirmButton }
export type { ToastConfirmProps, PolymorphicToastConfirmButton }
