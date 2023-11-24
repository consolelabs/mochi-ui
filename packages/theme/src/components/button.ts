import { cva, VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const commonVariant = {
  variant: {
    solid: '',
    outline: 'shadow-button border',
    ghost: '',
    link: 'p-0 rounded-md hover:underline',
  },
  color: {
    primary: '',
    secondary: '',
    success: '',
    warning: '',
    danger: '',
    neutral: '',
  },
} as const

const commonCompoundVariants = [
  {
    variant: 'solid',
    color: 'primary',
    className: [
      'bg-primary-solid text-primary-solid-fg',
      'hover:bg-primary-solid-hover',
      'active:bg-primary-solid-active',
      'disabled:bg-primary-solid-disable',
      'focus:shadow-small focus:shadow-primary-700/10',
    ],
  },
  {
    variant: 'solid',
    color: 'secondary',
    className: [
      'bg-secondary-solid text-secondary-solid-fg',
      'hover:bg-secondary-solid-hover',
      'active:bg-secondary-solid-active',
      'disabled:bg-secondary-solid-disable',
      'focus:shadow-small focus:shadow-secondary-700/10',
    ],
  },
  {
    variant: 'solid',
    color: 'danger',
    className: [
      'bg-danger-solid text-danger-solid-fg',
      'hover:bg-danger-solid-hover',
      'active:bg-danger-solid-active',
      'disabled:bg-danger-solid-disable',
      'focus:shadow-small focus:shadow-danger-700/10',
    ],
  },
  {
    variant: 'solid',
    color: 'success',
    className: [
      'bg-success-solid text-success-solid-fg',
      'hover:bg-success-solid-hover',
      'active:bg-success-solid-active',
      'disabled:bg-success-solid-disable',
      'focus:shadow-small focus:shadow-success-700/10',
    ],
  },
  {
    variant: 'solid',
    color: 'warning',
    className: [
      'bg-warning-solid text-warning-solid-fg',
      'hover:bg-warning-solid-hover',
      'active:bg-warning-solid-active',
      'disabled:bg-warning-solid-disable',
      'focus:shadow-small focus:shadow-warning-700/10',
    ],
  },
  {
    variant: 'solid',
    color: 'neutral',
    className: [
      'bg-neutral-solid text-neutral-solid-fg',
      'hover:bg-neutral-solid-hover',
      'active:bg-neutral-solid-active',
      'disabled:bg-neutral-solid-disable',
      'focus:shadow-small focus:shadow-neutral-700/10',
    ],
  },
  {
    variant: 'outline',
    color: 'primary',
    className: [
      'bg-primary-outline text-primary-outline-fg',
      'border-primary-outline-border',
      'hover:bg-primary-outline-hover',
      'active:bg-primary-outline-active',
      'disabled:text-primary-outline-disable-fg',
      'focus:shadow-small focus:shadow-primary-700/10',
    ],
  },
  {
    variant: 'outline',
    color: 'secondary',
    className: [
      'bg-secondary-outline text-secondary-outline-fg',
      'border-secondary-outline-border',
      'hover:bg-secondary-outline-hover',
      'active:bg-secondary-outline-active',
      'disabled:text-secondary-outline-disable-fg',
      'focus:shadow-small focus:shadow-secondary-700/10',
    ],
  },
  {
    variant: 'outline',
    color: 'success',
    className: [
      'bg-success-outline text-success-outline-fg',
      'border-success-outline-border',
      'hover:bg-success-outline-hover',
      'active:bg-success-outline-active',
      'disabled:text-success-outline-disable-fg',
      'focus:shadow-small focus:shadow-success-700/10',
    ],
  },
  {
    variant: 'outline',
    color: 'danger',
    className: [
      'bg-danger-outline text-danger-outline-fg',
      'border-danger-outline-border',
      'hover:bg-danger-outline-hover',
      'active:bg-danger-outline-active',
      'disabled:text-danger-outline-disable-fg',
      'focus:shadow-small focus:shadow-danger-700/10',
    ],
  },
  {
    variant: 'outline',
    color: 'warning',
    className: [
      'bg-warning-outline text-warning-outline-fg',
      'border-warning-outline-border',
      'hover:bg-warning-outline-hover',
      'active:bg-warning-outline-active',
      'disabled:text-warning-outline-disable-fg',
      'focus:shadow-small focus:shadow-warning-700/10',
    ],
  },
  {
    variant: 'outline',
    color: 'neutral',
    className: [
      'bg-neutral-outline text-neutral-outline-fg',
      'border-neutral-outline-border',
      'hover:bg-neutral-outline-hover',
      'active:bg-neutral-outline-active',
      'disabled:text-neutral-outline-disable-fg',
      'focus:shadow-small focus:shadow-neutral-700/10',
    ],
  },
  {
    variant: 'ghost',
    color: 'primary',
    className: [
      'text-primary-plain-fg bg-transparent',
      'hover:bg-primary-plain-hover',
      'active:bg-primary-plain-active',
      'disabled:text-primary-plain-disable-fg',
    ],
  },
  {
    variant: 'ghost',
    color: 'secondary',
    className: [
      'text-secondary-plain-fg bg-transparent',
      'hover:bg-secondary-plain-hover',
      'active:bg-secondary-plain-active',
      'disabled:text-secondary-plain-disable-fg',
    ],
  },
  {
    variant: 'ghost',
    color: 'success',
    className: [
      'text-success-plain-fg bg-transparent',
      'hover:bg-success-plain-hover',
      'active:bg-success-plain-active',
      'disabled:text-success-plain-disable-fg',
    ],
  },
  {
    variant: 'ghost',
    color: 'warning',
    className: [
      'text-warning-plain-fg bg-transparent',
      'hover:bg-warning-plain-hover',
      'active:bg-warning-plain-active',
      'disabled:text-warning-plain-disable-fg',
    ],
  },
  {
    variant: 'ghost',
    color: 'danger',
    className: [
      'text-danger-plain-fg bg-transparent',
      'hover:bg-danger-plain-hover',
      'active:bg-danger-plain-active',
      'disabled:text-danger-plain-disable-fg',
    ],
  },
  {
    variant: 'ghost',
    color: 'neutral',
    className: [
      'text-neutral-plain-fg bg-transparent',
      'hover:bg-neutral-plain-hover',
      'active:bg-neutral-plain-active',
      'disabled:text-neutral-plain-disable-fg',
    ],
  },
  {
    variant: 'link',
    color: 'primary',
    className: [
      'text-primary-plain-fg',
      'disabled:text-primary-plain-disable-fg',
      'focus:shadow-small focus:shadow-primary-700/10',
    ],
  },
  {
    variant: 'link',
    color: 'secondary',
    className: [
      'text-secondary-plain-fg',
      'disabled:text-secondary-plain-disable-fg',
      'focus:shadow-small focus:shadow-secondary-700/10',
    ],
  },
  {
    variant: 'link',
    color: 'success',
    className: [
      'text-success-plain-fg',
      'disabled:text-success-plain-disable-fg',
      'focus:shadow-small focus:shadow-success-700/10',
    ],
  },
  {
    variant: 'link',
    color: 'danger',
    className: [
      'text-danger-plain-fg',
      'disabled:text-danger-plain-disable-fg',
      'focus:shadow-small focus:shadow-danger-700/10',
    ],
  },
  {
    variant: 'link',
    color: 'warning',
    className: [
      'text-warning-plain-fg',
      'disabled:text-warning-plain-disable-fg',
      'focus:shadow-small focus:shadow-warning-700/10',
    ],
  },
  {
    variant: 'link',
    color: 'neutral',
    className: [
      'text-neutral-plain-fg',
      'disabled:text-neutral-plain-disable-fg',
      'focus:shadow-small focus:shadow-neutral-700/10',
    ],
  },
] as const

const buttonCva = cva(
  'inline-flex items-center justify-center outline-none gap-x-2 font-semibold appearance-none transition whitespace-nowrap',
  {
    variants: {
      ...commonVariant,
      size: {
        sm: 'text-sm leading-4',
        md: 'text-sm leading-4',
        lg: 'text-base leading-6',
      },
      disabled: {
        true: 'cursor-not-allowed pointer-events-none',
      },
      loading: {
        true: 'pointer-events-none pointer-events-none',
      },
    },
    compoundVariants: [
      {
        variant: ['solid', 'outline', 'ghost'],
        size: 'sm',
        className: 'px-4 h-[34px] rounded',
      },
      {
        variant: ['solid', 'outline', 'ghost'],
        size: 'md',
        className: 'px-4 h-10 rounded-lg',
      },
      {
        variant: ['solid', 'outline', 'ghost'],
        size: 'lg',
        className: 'px-6 h-12 rounded-lg',
      },
      ...commonCompoundVariants,
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
      loading: false,
    },
  },
)

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

const buttonLoadingIconClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('text-[40px]', className)

export const button = {
  buttonCva,
  buttonloadIndicatorCva,
  buttonLoadingIconClsx,
}

export const commonCvaProps = {
  variants: commonVariant,
  compounds: commonCompoundVariants,
}

export type ButtonStylesProps = VariantProps<typeof buttonCva>
