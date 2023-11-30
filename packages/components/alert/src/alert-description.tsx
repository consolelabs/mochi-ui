import { HTMLAttributes, forwardRef } from 'react'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type AlertDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  asChild?: boolean
}

type PolymorphicAlertDescription = Polymorphic.ForwardRefComponent<
  'p',
  AlertDescriptionProps
>

const AlertDescription = forwardRef((props, ref) => {
  const { as = 'p', asChild, className, ...restProps } = props
  const { layout, scheme, size } = useAlertContext()

  const Component = asChild ? Slot : as

  return (
    <Component
      ref={ref}
      className={alert.alertDescriptionCva({
        scheme,
        size,
        layout,
        className,
      })}
      data-size={size}
      data-scheme={scheme}
      data-layout={layout}
      {...restProps}
    />
  )
}) as PolymorphicAlertDescription
AlertDescription.displayName = 'AlertDescription'

export {
  AlertDescription,
  type PolymorphicAlertDescription,
  type AlertDescriptionProps,
}
