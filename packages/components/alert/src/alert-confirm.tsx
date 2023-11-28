import { Button, ButtonProps } from '@consolelabs/button'
import { forwardRef } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'
import { alert } from '@consolelabs/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type PolymorphicButton = Polymorphic.ForwardRefComponent<
  'button',
  ButtonProps & {
    asChild?: boolean
  }
>

export const AlertConfirm = forwardRef((props, ref) => {
  const {
    asChild,
    className,
    variant: variantProp,
    color: colorProp,
    children,
    ...restProps
  } = props
  const { scheme, variant, size } = useAlertContext()
  if (asChild) {
    return (
      <Slot
        // Allow user custom style
        data-size={size}
        data-scheme={scheme}
        data-variant={variant}
        className={alert.alertConfirmClsx({ className })}
      >
        {children}
      </Slot>
    )
  }
  return (
    <Button
      data-size={size}
      data-scheme={scheme}
      data-variant={variant}
      className={alert.alertConfirmClsx({ className })}
      variant={variantProp ?? 'solid'}
      color={colorProp ?? scheme}
      ref={ref}
      {...restProps}
    >
      {children}
    </Button>
  )
}) as PolymorphicButton
