import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

const buttonCva = cva(
  ['flex items-center gap-x-2 rounded-full font-semibold h-fit'],
  {
    variants: {
      variant: {
        solid: 'shadow-button border',
        outline: 'shadow-button border',
        link: '',
        ghost: 'border border-transparent',
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
        true: 'cursor-not-allowed',
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
        className:
          'bg-primary-700 text-white border-transparent hover:bg-primary-800 focus:shadow-button-focused-primary disabled:bg-primary-400',
      },
      {
        variant: 'solid',
        color: 'secondary',
        className:
          'bg-primary-100 text-primary-700 border-primary-300 hover:bg-primary-200 focus:shadow-button-focused-primary disabled:bg-primary-100 disabled:text-primary-400',
      },
      {
        variant: 'solid',
        color: 'danger',
        className:
          'bg-red-700 text-white border-transparent hover:bg-red-800 focus:shadow-button-focused-destructive disabled:bg-red-100 disabled:text-red-400',
      },
      {
        variant: 'solid',
        color: 'info',
        className:
          'bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-200 focus:shadow-button-focused-gray disabled:bg-neutral-100 disabled:text-neutral-400',
      },
      {
        variant: 'outline',
        color: ['primary', 'secondary'],
        className:
          'bg-white text-primary-700 border-primary-300 hover:bg-primary-100 focus:shadow-button-focused-primary disabled:text-primary-400 disabled:bg-white',
      },
      {
        variant: 'outline',
        color: 'danger',
        className:
          'bg-white text-red-700 border-red-300 hover:bg-red-100 focus:shadow-button-focused-destructive disabled:text-red-400 disabled:bg-white',
      },
      {
        variant: 'outline',
        color: 'info',
        className:
          'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100 focus:shadow-button-focused-gray disabled:text-neutral-400 disabled:bg-white',
      },
      {
        variant: 'link',
        color: ['primary', 'secondary'],
        className:
          'text-primary-700 hover:text-primary-800 disabled:text-neutral-400',
      },
      {
        variant: 'link',
        color: 'danger',
        className: 'text-red-700 hover:text-red-800 disabled:text-red-400',
      },
      {
        variant: 'link',
        color: 'info',
        className:
          'text-neutral-800 hover:text-neutral-900 disabled:text-neutral-400',
      },
      {
        variant: 'ghost',
        color: ['primary', 'secondary'],
        className:
          'bg-white text-primary-700 hover:bg-primary-100 hover:shadow-button disabled:text-neutral-400 disabled:bg-white disabled:shadow-none',
      },
      {
        variant: 'ghost',
        color: 'danger',
        className:
          'bg-white text-red-700 hover:bg-red-100 hover:shadow-button disabled:text-red-400 disabled:bg-white disabled:shadow-none',
      },
      {
        variant: 'ghost',
        color: 'info',
        className:
          'bg-white text-neutral-800 hover:bg-neutral-100 hover:shadow-button disabled:text-neutral-400 disabled:bg-white disabled:shadow-none',
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
