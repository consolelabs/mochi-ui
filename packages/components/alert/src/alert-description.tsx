import { HTMLAttributes, forwardRef } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'
import { alert } from '@consolelabs/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type AlertDescriptionProps = HTMLAttributes<HTMLSpanElement> & {
  asChild?: boolean
}

type PolymorphicAlertDescription = Polymorphic.ForwardRefComponent<
  'p',
  AlertDescriptionProps
>

const AlertDescription = forwardRef((props, ref) => {
  const { as = 'p', asChild, className, ...restProps } = props
  const { variant, scheme, size, responsive } = useAlertContext()

  const Component = asChild ? Slot : as

  return (
    <Component
      ref={ref}
      className={alert.alertDescriptionCva({
        variant,
        scheme,
        size,
        responsive,
        className,
      })}
      data-size={size}
      data-scheme={scheme}
      data-responsive={responsive}
      data-variant={variant}
      {...restProps}
    />
  )
}) as PolymorphicAlertDescription

export {
  AlertDescription,
  type PolymorphicAlertDescription,
  type AlertDescriptionProps,
}
