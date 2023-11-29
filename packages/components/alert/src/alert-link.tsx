import { forwardRef } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'
import { alert } from '@consolelabs/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type PolymorphicLink = Polymorphic.ForwardRefComponent<
  'a',
  {
    asChild?: boolean
  }
>

export const AlertLink = forwardRef((props, ref) => {
  const { as = 'a', className, asChild, ...restProps } = props
  const { variant, scheme, size } = useAlertContext()
  const Component = asChild ? Slot : as

  return (
    <Component
      data-scheme={scheme}
      data-variant={variant}
      data-size={size}
      className={alert.alertLinkCva({ variant, scheme, size, className })}
      ref={ref}
      {...restProps}
    />
  )
}) as PolymorphicLink
