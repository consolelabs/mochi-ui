import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

const buttonCva = cva(
  ['flex items-center gap-x-2 rounded-full font-semibold h-fit'],
  {
    variants: {
      variant: {
        solid: 'shadow-button border',
        outline:
          'bg-white text-neutral-800 shadow-button border border-neutral-300',
        link: 'bg-white text-neutral-800',
        ghost:
          'bg-white text-neutral-800 border border-transparent hover:shadow-button hover:border-neutral-300',
      },
      color: {
        primary: '',
        secondary: '',
        info: '',
        danger: '',
      },
      size: {
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        size: ['sm', 'md', 'lg'],
        className: 'px-0 py-0',
      },
      {
        variant: ['solid', 'outline', 'ghost'],
        size: 'sm',
        className: 'p-2',
      },
      {
        variant: ['solid', 'outline', 'ghost'],
        size: 'md',
        className: 'p-2.5',
      },
      {
        variant: ['solid', 'outline', 'ghost'],
        size: 'lg',
        className: 'p-3',
      },
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-primary-700 text-white border-transparent',
      },
      {
        variant: 'solid',
        color: 'secondary',
        className: 'bg-neutral-800 text-white border-transparent',
      },
      {
        variant: 'solid',
        color: 'danger',
        className: 'bg-red-700 text-white border-transparent',
      },
      {
        variant: 'solid',
        color: 'info',
        className: 'bg-neutral-100 text-neutral-800 border-neutral-200',
      },
      {
        variant: 'outline',
        color: 'primary',
        className: 'text-primary-700 border-primary-700',
      },
      {
        variant: 'outline',
        color: 'danger',
        className: 'text-red-700 border-red-700',
      },
      {
        variant: 'link',
        color: 'primary',
        className: 'text-primary-700',
      },
      {
        variant: 'link',
        color: 'danger',
        className: 'text-red-700',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-primary-700 hover:border-primary-700',
      },
      {
        variant: 'ghost',
        color: 'danger',
        className: 'text-red-700 hover:border-red-700',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
    },
  },
)

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonCva> & {
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
}: Props) {
  return (
    <button
      className={buttonCva({ className, variant, color, size, disabled })}
      disabled={disabled}
      type={rest.type || 'button'}
      {...rest}
    >
      {children}
    </button>
  )
}
