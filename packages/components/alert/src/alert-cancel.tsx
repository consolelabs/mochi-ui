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

export const AlertCancel = forwardRef((props, ref) => {
  const {
    asChild,
    className,
    variant: variantProp,
    color: colorProp,
    children,
    ...restProps
  } = props
  const { scheme, variant, size, responsive } = useAlertContext()
  if (asChild) {
    return (
      <Slot
        // Allow user custom style
        data-scheme={scheme}
        data-variant={variant}
        data-size={size}
        data-responsive={responsive}
        className={alert.alertCancelClsx({ className })}
      >
        {children}
      </Slot>
    )
  }
  return (
    <Button
      data-scheme={scheme}
      data-variant={variant}
      data-size={size}
      data-responsive={responsive}
      className={alert.alertCancelClsx({ className })}
      variant={variantProp ?? 'link'}
      color={colorProp ?? 'neutral'}
      ref={ref}
      {...restProps}
    >
      {children}
    </Button>
  )
}) as PolymorphicButton
