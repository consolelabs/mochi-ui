import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

const buttonCva = cva(
  ['flex items-center gap-x-2 rounded font-semibold shadow-button border'],
  {
    variants: {
      variant: {
        primary: 'bg-primary-700 text-white border-transparent',
        'secondary-1': 'bg-neutral-800 text-white border-transparent',
        'secondary-2': 'bg-neutral-100 text-neutral-800 border-neutral-200',
        'secondary-3': 'bg-white text-neutral-800 border-neutral-300',
        danger: 'bg-red-700 text-white border-transparent',
      },
      size: {
        small: 'px-4 py-[7px] text-sm',
        medium: 'px-4 py-2.5 text-sm',
        large: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
)

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonCva> & {
    children?: React.ReactNode
    className?: string
  }

export default function Button({
  children,
  variant,
  size,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={buttonCva({ className, variant, size })}
      type={rest.type || 'button'}
      {...rest}
    >
      {children}
    </button>
  )
}
