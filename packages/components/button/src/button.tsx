import { button, ButtonStylesProps } from '@consolelabs/theme'
import { IconThreeDotLoading } from '@consolelabs/icons'
import { ButtonHTMLAttributes, ReactNode } from 'react'

const { buttonCva, buttonloadIndicatorCva, buttonLoadingIconClsx } = button

export type ButtonProps = ButtonStylesProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode
    className?: string
    loading?: boolean
    loadingIndicator?: ReactNode
    loadingIndicatorClassName?: string
  }

export default function Button({
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
}: ButtonProps) {
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
      {...rest}
    >
      {loading ? loadingIndicator : children}
    </button>
  )
}
