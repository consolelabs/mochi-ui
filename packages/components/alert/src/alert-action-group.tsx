import { alert, alertActionGroupStyleProps } from '@mochi-ui/theme'
import { ComponentPropsWithRef, forwardRef } from 'react'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type PolymorphicAlertActionGroup = Polymorphic.ForwardRefComponent<
  'div',
  {
    asChild?: boolean
  } & alertActionGroupStyleProps
>

type AlertActionGroupProps = ComponentPropsWithRef<PolymorphicAlertActionGroup>

const AlertActionGroup = forwardRef((props, ref) => {
  const {
    className,
    as = 'div',
    layout: layoutProp,
    asChild,
    ...restProps
  } = props
  const { layout: layoutContext, size, scheme } = useAlertContext()

  const Component = asChild ? Slot : as
  const layout = layoutProp ?? layoutContext

  return (
    <Component
      data-layout={layout}
      data-scheme={scheme}
      data-size={size}
      className={alert.alertActionGroupCva({ layout, className })}
      ref={ref}
      {...restProps}
    />
  )
}) as PolymorphicAlertActionGroup
AlertActionGroup.displayName = 'AlertActionGroup'

export { AlertActionGroup }
export type { PolymorphicAlertActionGroup, AlertActionGroupProps }
