import { HTMLAttributes, forwardRef } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'
import { alert } from '@consolelabs/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type PolymorphicAlertTitle = Polymorphic.ForwardRefComponent<
  'h3',
  HTMLAttributes<HTMLSpanElement> & { asChild?: boolean }
>

export const AlertTitle = forwardRef((props, ref) => {
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
