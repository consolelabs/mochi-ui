import { Button, ButtonProps } from '@mochi-ui/button'
import { ComponentPropsWithRef, forwardRef } from 'react'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import * as Polymorphic from '@mochi-ui/polymorphic'
import { useAlertContext } from './context'

type PolymorphicAlertCancelButton = Polymorphic.ForwardRefComponent<
  'button',
  ButtonProps & {
    asChild?: boolean
  }
>

type AlertCancelProps = ComponentPropsWithRef<PolymorphicAlertCancelButton>

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
      className={alert.alertCancelClsx({ className, layout })}
      ref={ref}
      {...passProps}
    >
      {children}
    </Component>
  )
}) as PolymorphicAlertCancelButton
AlertCancelButton.displayName = 'AlertCancelButton'

export { AlertCancelButton }
export type { AlertCancelProps, PolymorphicAlertCancelButton }
