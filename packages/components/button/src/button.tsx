import { button, ButtonStyleProps } from '@consolelabs/theme'
import { IconThreeDotLoading } from '@consolelabs/icons'

const { buttonCva, buttonloadIndicatorCva, buttonLoadingIconClsx } = button

type ButtonProps = ButtonStyleProps

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

export { type ButtonProps }
