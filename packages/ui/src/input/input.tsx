import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { InputHTMLAttributes } from 'react'

const inputCva = cva(
  [
    'flex-1 outline-0 rounded border border-neutral-300 shadow-input text-neutral-800 placeholder:text-neutral-500 focus:border-primary-600 focus:shadow-input-focused',
  ],
  {
    variants: {
      size: {
        base: 'px-3.5 py-2.5 text-sm',
        large: 'px-4 py-3.5 text-md leading-snug',
      },
      disabled: {
        true: 'bg-neutral-100 text-neutral-500 cursor-not-allowed',
      },
      error: {
        true: 'border-red-700 focus:border-red-700 focus:shadow-input',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
)

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputCva> & {
    disabled?: boolean
    error?: boolean
  }

export default function Input({
  disabled,
  error,
  size,
  className,
  ...rest
}: Props) {
  return (
    <input
      className={inputCva({ className, size, disabled, error })}
      disabled={disabled}
      {...rest}
    />
  )
}
