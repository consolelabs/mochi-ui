import { HTMLAttributes, forwardRef } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'
import { alert } from '@consolelabs/theme'
import { useAlertContext } from './context'

type PolymorphicAlertTitle = Polymorphic.ForwardRefComponent<
  'h3',
  HTMLAttributes<HTMLSpanElement>
>

export const AlertTitle = forwardRef((props, ref) => {
  const { as: Component = 'h3', className, ...restProps } = props
  const { scheme, variant, size, responsive } = useAlertContext()

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
