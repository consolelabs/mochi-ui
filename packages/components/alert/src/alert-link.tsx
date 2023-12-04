import { ComponentPropsWithRef, forwardRef } from 'react'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import { alert } from '@mochi-ui/theme'
import { Slot } from '@radix-ui/react-slot'
import { useAlertContext } from './context'

type PolymorphicAlertLink = Polymorphic.ForwardRefComponent<
  'a',
  {
    asChild?: boolean
  }
>

type AlertLinkProps = ComponentPropsWithRef<PolymorphicAlertLink>

const AlertLink = forwardRef((props, ref) => {
  const { as = 'a', className, asChild, ...restProps } = props
  const { layout, scheme, size } = useAlertContext()
  const Component = asChild ? Slot : as

  return (
    <Component
      data-scheme={scheme}
      data-layout={layout}
      data-size={size}
      className={alert.alertLinkCva({
        scheme,
        size,
        layout,
        className,
      })}
      ref={ref}
      {...restProps}
    />
  )
}) as PolymorphicAlertLink
AlertLink.displayName = 'AlertLink'

export { AlertLink, type PolymorphicAlertLink, type AlertLinkProps }
