import { forwardRef } from 'react'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type AlertTitleProps = { asChild?: boolean }

type PolymorphicAlertTitle = Polymorphic.ForwardRefComponent<
  'h3',
  AlertTitleProps
>

const AlertTitle = forwardRef((props, ref) => {
  const { as = 'h3', className, asChild, ...restProps } = props
  const { scheme, variant, size, responsive } = useAlertContext()

  const Component = asChild ? Slot : as
  return (
    <Component
      data-scheme={scheme}
      data-responsive={responsive}
      data-variant={variant}
      data-size={size}
      className={alert.alertTitleCva({
        scheme,
        variant,
        size,
        responsive,
        className,
      })}
      ref={ref}
      {...restProps}
    />
  )
}) as PolymorphicAlertTitle

export { AlertTitle, type PolymorphicAlertTitle, type AlertTitleProps }
