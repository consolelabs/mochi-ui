import { HTMLAttributes, forwardRef } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'
import { alert } from '@consolelabs/theme'
import { useAlertContext } from './context'

type PolymorphicAlertDescription = Polymorphic.ForwardRefComponent<
  'p',
  HTMLAttributes<HTMLSpanElement>
>

export const AlertDescription = forwardRef((props, ref) => {
  const { as: Component = 'p', className, ...restProps } = props
  const { variant, scheme, size } = useAlertContext()

  return (
    <Component
      ref={ref}
      className={alert.alertDescriptionCva({
        variant,
        scheme,
        size,
        className,
      })}
      {...restProps}
    />
  )
}) as PolymorphicAlertDescription
