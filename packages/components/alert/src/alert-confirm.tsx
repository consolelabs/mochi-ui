import { Button, ButtonProps } from '@mochi-ui/button'
import { forwardRef } from 'react'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type AlertConfirmProps = ButtonProps & {
  asChild?: boolean
}

type PolymorphicAlertConfirmButton = Polymorphic.ForwardRefComponent<
  'button',
  AlertConfirmProps
>

const AlertConfirmButton = forwardRef((props, ref) => {
  const {
    asChild,
    className,
    variant: variantProp,
    color: colorProp,
    children,
    ...restProps
  } = props
  const { scheme, layout, size } = useAlertContext()
  const Component = asChild ? Slot : Button
  const passProps = asChild
    ? {}
    : {
        variant: variantProp ?? 'solid',
        color: colorProp ?? scheme,
        ...restProps,
      }

  return (
    <Component
      data-size={size}
      data-scheme={scheme}
      data-layout={layout}
      className={alert.alertConfirmClsx({ className })}
      ref={ref}
      {...passProps}
    >
      {children}
    </Component>
  )
}) as PolymorphicAlertConfirmButton
AlertConfirmButton.displayName = 'AlertConfirmButton'

export {
  type PolymorphicAlertConfirmButton,
  type AlertConfirmProps,
  AlertConfirmButton,
}
