import { input, InputStylesProps } from '@consolelabs/theme'
import { HTMLAttributes } from 'react'

type InputProps = HTMLAttributes<HTMLInputElement> &
  InputStylesProps & {
    disabled?: boolean
    error?: boolean
    className?: string
  }

export default function Input({
  disabled,
  error,
  size,
  className,
  ...rest
}: InputProps) {
  const { inputVariants } = input

  return (
    <input
      className={inputVariants({ className, size, disabled, error })}
      disabled={disabled}
      {...rest}
    />
  )
}

export { type InputProps }
