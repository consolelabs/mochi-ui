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
  const { scheme, layout, size } = useAlertContext()
  const Component = asChild ? Slot : Button
  const passProps = asChild
    ? {}
    : {
        variant: variantProp ?? 'link',
        color: colorProp ?? 'neutral',
        ...restProps,
      }
  return (
    <Component
      data-scheme={scheme}
      data-layout={layout}
      data-size={size}
      className={alert.alertCancelClsx({ className })}
      ref={ref}
      {...passProps}
    >
      {children}
    </Component>
  )
}) as PolymorphicAlertCancelButton
AlertCancelButton.displayName = 'AlertCancelButton'

export { AlertCancelButton, type PolymorphicAlertCancelButton }
