import { AlertTitle, AlertTitleProps } from '@consolelabs/alert'
import * as ToastPrimitive from '@radix-ui/react-toast'
import * as Polymorphic from '@consolelabs/polymorphic'
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react'

type PolymorphicToastTitle = Polymorphic.ForwardRefComponent<
  'h3',
  ComponentPropsWithoutRef<typeof ToastPrimitive.Title> &
    AlertTitleProps &
    ToastPrimitive.ToastTitleProps
>

const ToastTitle = forwardRef((props, ref) => {
  const { asChild, className, children, as = 'h3', ...restProps } = props
  const alertTitleProps = { asChild, className, children, as }

  return (
    <ToastPrimitive.Title {...restProps} asChild>
      <AlertTitle ref={ref} {...alertTitleProps} />
    </ToastPrimitive.Title>
  )
}) as PolymorphicToastTitle

type ToastTitleProps = ComponentPropsWithRef<PolymorphicToastTitle>

export { ToastTitle, type ToastTitleProps, type PolymorphicToastTitle }
