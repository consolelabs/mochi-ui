import { cva, VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const commonVariant = {
  variant: {
    solid: '',
    outline: 'border',
    ghost: '',
    link: 'bg-transparent',
    soft: '',
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
      'enabled:hover:bg-primary-solid-hover',
      'enabled:active:bg-primary-solid-active',
      'disabled:bg-primary-solid-disable disabled:text-primary-solid-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'solid',
    color: 'secondary',
    className: [
      'bg-secondary-solid text-secondary-solid-fg',
      'enabled:hover:bg-secondary-solid-hover',
      'enabled:active:bg-secondary-solid-active',
      'disabled:bg-secondary-solid-disable disabled:text-secondary-solid-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'solid',
    color: 'danger',
    className: [
      'bg-danger-solid text-danger-solid-fg',
      'enabled:hover:bg-danger-solid-hover',
      'enabled:active:bg-danger-solid-active',
      'disabled:bg-danger-solid-disable disabled:text-danger-solid-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'solid',
    color: 'success',
    className: [
      'bg-success-solid text-success-solid-fg',
      'enabled:hover:bg-success-solid-hover',
      'enabled:active:bg-success-solid-active',
      'disabled:bg-success-solid-disable disabled:text-success-solid-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'solid',
    color: 'warning',
    className: [
      'bg-warning-solid text-warning-solid-fg',
      'enabled:hover:bg-warning-solid-hover',
      'enabled:active:bg-warning-solid-active',
      'disabled:bg-warning-solid-disable disabled:text-warning-solid-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'solid',
    color: 'neutral',
    className: [
      'bg-neutral-solid text-neutral-solid-fg',
      'enabled:hover:bg-neutral-solid-hover',
      'enabled:active:bg-neutral-solid-active',
      'disabled:bg-neutral-solid-disable disabled:text-neutral-solid-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'outline',
    color: 'primary',
    className: [
      'text-primary-outline-fg',
      'border-primary-outline-border',
      'enabled:hover:bg-primary-outline-hover',
      'enabled:active:bg-primary-outline-active',
      'disabled:text-primary-outline-disable-fg disabled:border-primary-outline-disable-border',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'outline',
    color: 'secondary',
    className: [
      'text-secondary-outline-fg',
      'border-secondary-outline-border',
      'enabled:hover:bg-secondary-outline-hover',
      'enabled:active:bg-secondary-outline-active',
      'disabled:text-secondary-outline-disable-fg disabled:border-secondary-outline-disable-border',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'outline',
    color: 'success',
    className: [
      'text-success-outline-fg',
      'border-success-outline-border',
      'enabled:hover:bg-success-outline-hover',
      'enabled:active:bg-success-outline-active',
      'disabled:text-success-outline-disable-fg disabled:border-success-outline-disable-border',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'outline',
    color: 'danger',
    className: [
      'text-danger-outline-fg',
      'border-danger-outline-border',
      'enabled:hover:bg-danger-outline-hover',
      'enabled:active:bg-danger-outline-active',
      'disabled:text-danger-outline-disable-fg disabled:border-danger-outline-disable-border',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'outline',
    color: 'warning',
    className: [
      'text-warning-outline-fg',
      'border-warning-outline-border',
      'enabled:hover:bg-warning-outline-hover',
      'enabled:active:bg-warning-outline-active',
      'disabled:text-warning-outline-disable-fg disabled:border-warning-outline-disable-border',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'outline',
    color: 'neutral',
    className: [
      'text-neutral-outline-fg',
      'border-neutral-outline-border',
      'enabled:hover:bg-neutral-outline-hover',
      'enabled:active:bg-neutral-outline-active',
      'disabled:text-neutral-outline-disable-fg disabled:border-neutral-outline-disable-border',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'ghost',
    color: 'primary',
    className: [
      'text-primary-plain-fg',
      'enabled:hover:bg-primary-plain-hover',
      'enabled:active:bg-primary-plain-active',
      'disabled:text-primary-plain-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'ghost',
    color: 'secondary',
    className: [
      'text-secondary-plain-fg',
      'enabled:hover:bg-secondary-plain-hover',
      'enabled:active:bg-secondary-plain-active',
      'disabled:text-secondary-plain-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'ghost',
    color: 'success',
    className: [
      'text-success-plain-fg',
      'enabled:hover:bg-success-plain-hover',
      'enabled:active:bg-success-plain-active',
      'disabled:text-success-plain-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'ghost',
    color: 'warning',
    className: [
      'text-warning-plain-fg',
      'enabled:hover:bg-warning-plain-hover',
      'enabled:active:bg-warning-plain-active',
      'disabled:text-warning-plain-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'ghost',
    color: 'danger',
    className: [
      'text-danger-plain-fg',
      'enabled:hover:bg-danger-plain-hover',
      'enabled:active:bg-danger-plain-active',
      'disabled:text-danger-plain-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'ghost',
    color: 'neutral',
    className: [
      'text-neutral-plain-fg',
      'enabled:hover:bg-neutral-plain-hover',
      'enabled:active:bg-neutral-plain-active',
      'disabled:text-neutral-plain-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'link',
    color: 'primary',
    className: [
      'text-primary-plain-fg',
      'disabled:text-primary-plain-disable-fg',
    ],
  },
  {
    variant: 'link',
    color: 'secondary',
    className: [
      'text-secondary-plain-fg',
      'disabled:text-secondary-plain-disable-fg',
    ],
  },
  {
    variant: 'link',
    color: 'success',
    className: [
      'text-success-plain-fg',
      'disabled:text-success-plain-disable-fg',
    ],
  },
  {
    variant: 'link',
    color: 'danger',
    className: [
      'text-danger-plain-fg',
      'disabled:text-danger-plain-disable-fg',
    ],
  },
  {
    variant: 'link',
    color: 'warning',
    className: [
      'text-warning-plain-fg',
      'disabled:text-warning-plain-disable-fg',
    ],
  },
  {
    variant: 'link',
    color: 'neutral',
    className: [
      'text-neutral-plain-fg',
      'disabled:text-neutral-plain-disable-fg',
    ],
  },
  {
    variant: 'soft',
    color: 'primary',
    className: [
      'bg-primary-soft',
      'text-primary-soft-fg',
      'enabled:hover:bg-primary-soft-hover',
      'enabled:active:bg-primary-soft-active enabled:active:text-primary-soft-active-fg',
      'disabled:bg-primary-soft-disable disabled:text-primary-soft-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'soft',
    color: 'secondary',
    className: [
      'bg-secondary-soft',
      'text-secondary-soft-fg',
      'enabled:hover:bg-secondary-soft-hover',
      'enabled:active:bg-secondary-soft-active enabled:active:text-secondary-soft-active-fg',
      'disabled:bg-secondary-soft-disable disabled:text-secondary-soft-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'soft',
    color: 'danger',
    className: [
      'bg-danger-soft',
      'text-danger-soft-fg',
      'enabled:hover:bg-danger-soft-hover',
      'enabled:active:bg-danger-soft-active enabled:active:text-danger-soft-active-fg',
      'disabled:bg-danger-soft-disable disabled:text-danger-soft-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'soft',
    color: 'success',
    className: [
      'bg-success-soft',
      'text-success-soft-fg',
      'enabled:hover:bg-success-soft-hover',
      'enabled:active:bg-success-soft-active enabled:active:text-success-soft-active-fg',
      'disabled:bg-success-soft-disable disabled:text-success-soft-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'soft',
    color: 'warning',
    className: [
      'bg-warning-soft',
      'text-warning-soft-fg',
      'enabled:hover:bg-warning-soft-hover',
      'enabled:active:bg-warning-soft-active enabled:active:text-warning-soft-active-fg',
      'disabled:bg-warning-soft-disable disabled:text-warning-soft-disable-fg',
      'focus:shadow-small',
    ],
  },
  {
    variant: 'soft',
    color: 'neutral',
    className: [
      'bg-neutral-soft',
      'text-neutral-soft-fg',
      'enabled:hover:bg-neutral-soft-hover',
      'enabled:active:bg-neutral-soft-active enabled:active:text-neutral-soft-active-fg',
      'disabled:bg-neutral-soft-disable disabled:text-neutral-soft-disable-fg',
      'focus:shadow-small',
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
        variant: ['solid', 'outline', 'ghost', 'link', 'soft'],
        size: 'sm',
        className: 'px-4 h-[34px] rounded',
      },
      {
        variant: ['solid', 'outline', 'ghost', 'link', 'soft'],
        size: 'md',
        className: 'px-4 h-10 rounded-lg',
      },
      {
        variant: ['solid', 'outline', 'ghost', 'link', 'soft'],
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
