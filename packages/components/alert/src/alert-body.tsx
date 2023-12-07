import { ComponentPropsWithRef, forwardRef } from 'react'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import { Slot } from '@radix-ui/react-slot'
import { AlertBodyStyleProps, alert } from '@mochi-ui/theme'
import { useAlertContext } from './context'

type PolymorphicAlertBody = Polymorphic.ForwardRefComponent<
  'div',
  {
    asChild?: boolean
  } & AlertBodyStyleProps
>

type AlertBodyProps = ComponentPropsWithRef<PolymorphicAlertBody>

const AlertBody = forwardRef((props, ref) => {
  const {
    asChild,
    as = 'div',
    className,
    layout: layoutProp,
    children,
    ...restProps
  } = props
  const { layout: layoutContext, scheme, size } = useAlertContext()

  const layout = layoutProp ?? layoutContext
  const Component = asChild ? Slot : as
  const passProps = asChild ? {} : { ref, ...restProps }

  return (
    <Component
      ref={ref}
      data-layout={layout}
      data-scheme={scheme}
      data-size={size}
      className={alert.alertBodyCva({ layout, className })}
      {...passProps}
    >
      {children}
    </Component>
  )
}) as PolymorphicAlertBody
AlertBody.displayName = 'AlertBody'

export { AlertBody }
export type { AlertBodyProps, PolymorphicAlertBody }
