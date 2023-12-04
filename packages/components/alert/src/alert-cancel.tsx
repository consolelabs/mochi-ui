import { Button } from '@mochi-ui/button'
import { forwardRef } from 'react'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import * as Polymorphic from '@mochi-ui/polymorphic'
import { useAlertContext } from './context'
import { AlertConfirmProps } from './alert-confirm'

type AlertCancelProps = AlertConfirmProps

type PolymorphicAlertCancelButton = Polymorphic.ForwardRefComponent<
  'button',
  AlertCancelProps
>

const AlertCancelButton = forwardRef((props, ref) => {
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
}) as PolymorphicAlertCancelButton

export { AlertCancelButton, type PolymorphicAlertCancelButton }
