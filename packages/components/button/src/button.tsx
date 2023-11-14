import { button, ButtonStylesProps } from '@consolelabs/theme'
import { IconThreeDotLoading } from '@consolelabs/icons'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'

const { buttonCva, buttonloadIndicatorCva, buttonLoadingIconClsx } = button

export type ButtonProps = ButtonStylesProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode
    className?: string
    loading?: boolean
    loadingIndicator?: ReactNode
    loadingIndicatorClassName?: string
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      color,
      size,
      disabled,
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
          <IconThreeDotLoading className={buttonLoadingIconClsx()} />
        )}
      </div>
    )

    return (
      <button
        className={buttonCva({
          className,
          variant,
          color,
          size,
          disabled,
          loading,
        })}
        disabled={disabled}
        type={rest.type || 'button'}
        ref={ref}
        {...rest}
      >
        {loading ? loadingIndicator : children}
      </button>
    )
  },
)

export default Button
