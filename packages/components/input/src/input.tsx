import { input, InputProps } from '@consolelabs/theme'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLInputElement> &
  InputProps & {
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
}: Props) {
  const { inputVariants } = input

  return (
    <input
      className={inputVariants({ className, size, disabled, error })}
      disabled={disabled}
      {...rest}
    />
  )
}
