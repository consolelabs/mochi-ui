import { forwardRef } from 'react'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type PolymorphicAlertTitle = Polymorphic.ForwardRefComponent<
  'h3',
  { asChild?: boolean }
>

type AlertTitleProps = ComponentPropsWithRef<PolymorphicAlertTitle>

const AlertTitle = forwardRef((props, ref) => {
  const { as = 'h3', className, asChild, ...restProps } = props
  const { scheme, layout, size } = useAlertContext()

  const Component = asChild ? Slot : as
  return (
    <Component
      data-scheme={scheme}
      data-layout={layout}
      data-size={size}
      className={alert.alertTitleCva({
        scheme,
        layout,
        size,
        className,
      })}
      ref={ref}
      {...restProps}
    />
  )
}) as PolymorphicAlertTitle
AlertTitle.displayName = 'AlertTitle'

export { AlertTitle, type PolymorphicAlertTitle, type AlertTitleProps }
