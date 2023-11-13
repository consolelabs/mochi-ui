import { iconButton, IconButtonStylesProps } from '@consolelabs/theme'
import { ButtonHTMLAttributes } from 'react'

const { iconButtonCva } = iconButton

type IconButtonProps = IconButtonStylesProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode
    className?: string
  }

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

export { type IconButtonProps }
