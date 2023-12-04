import { forwardRef } from 'react'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type AlertLinkProps = {
  asChild?: boolean
}

type PolymorphicAlertLink = Polymorphic.ForwardRefComponent<'a', AlertLinkProps>

const AlertLink = forwardRef((props, ref) => {
  const { as = 'a', className, asChild, ...restProps } = props
  const { variant, scheme, responsive, size } = useAlertContext()
  const Component = asChild ? Slot : as

  return (
    <Component
      data-scheme={scheme}
      data-variant={variant}
      data-responsive={responsive}
      data-size={size}
      className={alert.alertLinkCva({
        variant,
        scheme,
        size,
        responsive,
        className,
      })}
      ref={ref}
      {...restProps}
    />
  )
}) as PolymorphicAlertLink

export { AlertLink, type PolymorphicAlertLink, type AlertLinkProps }
