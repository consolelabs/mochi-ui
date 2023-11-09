import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const buttonCva = cva(['flex items-center gap-x-2 font-semibold transition'], {
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
      sm: 'text-sm h-[34px] leading-4',
      md: 'text-sm h-10 leading-4',
      lg: 'text-base h-12 leading-6',
    },
    disabled: {
      true: 'cursor-not-allowed',
    },
    loading: {
      true: 'pointer-events-none',
    },
  },
  compoundVariants: [
    {
      variant: 'link',
      size: ['sm', 'md', 'lg'],
      className: 'px-0 py-0 h-fit',
    },
    {
      variant: ['solid', 'outline', 'ghost'],
      size: 'sm',
      className: 'px-4 py-1.5 rounded',
    },
    {
      variant: ['solid', 'outline', 'ghost'],
      size: 'md',
      className: 'px-4 py-[9px] rounded-lg',
    },
    {
      variant: ['solid', 'outline', 'ghost'],
      size: 'lg',
      className: 'px-6 py-3 rounded-lg',
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
    loading: false,
  },
})

const buttonloadIndicatorCva = cva('flex items-center', {
  variants: {
    size: {
      sm: 'h-5 text-sm',
      md: 'h-5 text-base',
      lg: 'h-6 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const buttonLoadingIconClsx = ({ className = '' }: { className?: string }) =>
  clsx('text-[40px]', className)

export const button = {
  buttonCva,
  buttonloadIndicatorCva,
  buttonLoadingIconClsx,
}

export type ButtonStyleProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonCva> & {
    children?: React.ReactNode
    className?: string
    loading?: boolean
    loadingIndicator?: ReactNode
    loadingIndicatorClassName?: string
  }
