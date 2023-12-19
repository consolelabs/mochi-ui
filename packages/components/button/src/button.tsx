import { button, ButtonStylesProps } from '@mochi-ui/theme'
import { ThreeDotLoading } from '@mochi-ui/icons'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import React, { ReactNode } from 'react'

const { buttonCva, buttonloadIndicatorCva, buttonLoadingIconClsx } = button

export type ButtonProps = ButtonStylesProps & {
  loading?: boolean
  loadingIndicator?: ReactNode
  loadingIndicatorClassName?: string
}

type PolymorphicButton = Polymorphic.ForwardRefComponent<'button', ButtonProps>

const Button = React.forwardRef(
  (
    {
      as: Component = 'button',
      children,
      variant,
      color,
      size,
      disabled = false,
      className,
      loading,
      loadingIndicator: customerIndicator,
      loadingIndicatorClassName,
      ...rest
    },
    ref,
  ) => {
    const loadingIndicator = (
      <div
        className={buttonloadIndicatorCva({
          size,
          className: loadingIndicatorClassName,
        })}
      >
        {customerIndicator ?? (
          <ThreeDotLoading className={buttonLoadingIconClsx()} />
        )}
      </div>
    )

    return (
      <Component
        className={buttonCva({
          className,
          variant,
          color,
          size,
          disabled,
          loading,
        })}
        disabled={disabled as boolean | undefined}
        ref={ref}
        {...rest}
      >
        {loading ? loadingIndicator : children}
      </Component>
    )
  },
) as PolymorphicButton

Button.displayName = 'Button'

export default Button
