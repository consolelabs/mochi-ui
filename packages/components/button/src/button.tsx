import { button, ButtonStylesProps } from '@mochi-ui/theme'
import { ThreeDotLoading } from '@mochi-ui/icons'
import { Slot } from '@radix-ui/react-slot'
import React, { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react'

const { buttonCva, buttonloadIndicatorCva, buttonLoadingIconClsx } = button

export type ButtonProps = ButtonStylesProps & {
  loading?: boolean
  loadingIndicator?: ReactNode
  loadingIndicatorClassName?: string
  asChild?: boolean
} & ComponentPropsWithoutRef<'button'>

const Button = React.forwardRef<ElementRef<'button'>, ButtonProps>(
  (
    {
      children,
      variant,
      color,
      size,
      disabled = false,
      className,
      loading,
      loadingIndicator: customerIndicator,
      loadingIndicatorClassName,
      asChild,
      ...rest
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button'
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
)

Button.displayName = 'Button'

export default Button
