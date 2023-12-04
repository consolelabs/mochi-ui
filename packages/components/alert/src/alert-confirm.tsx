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
  const { scheme, variant, responsive, size } = useAlertContext()
  if (asChild) {
    return (
      <Slot
        data-size={size}
        data-scheme={scheme}
        data-responsive={responsive}
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
      data-responsive={responsive}
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
}) as PolymorphicAlertConfirmButton

export {
  type PolymorphicAlertConfirmButton,
  type AlertConfirmProps,
  AlertConfirmButton,
}
