<<<<<<< HEAD
import { alert } from '@mochi-ui/theme'
import { HTMLAttributes, forwardRef } from 'react'
=======
import { alert } from '@consolelabs/theme'
import { ComponentPropsWithRef, forwardRef } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type PolymorphicAlertActionGroup = Polymorphic.ForwardRefComponent<
  'div',
  {
    asChild?: boolean
    layout?: 'inline' | 'stack'
  }
>

type AlertBodyProps = ComponentPropsWithRef<PolymorphicAlertActionGroup>

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
>>>>>>> e078960 (fix: update alert props)

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
export type { AlertBodyProps, PolymorphicAlertActionGroup }
