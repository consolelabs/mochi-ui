import { iconButton, IconButtonProps } from '@consolelabs/theme'

const { iconButtonCva } = iconButton

export default function IconButton({
  children,
  variant,
  color,
  size,
  disabled,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={iconButtonCva({ className, variant, color, size, disabled })}
      disabled={disabled}
      type={rest.type || 'button'}
      {...rest}
    >
      {children}
    </button>
  )
}
