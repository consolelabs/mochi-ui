import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const iconButtonCva = cva(
  [
    'flex',
    'items-center',
    'gap-x-2',
    'rounded-full',
    'font-semibold',
    'h-fit',
    'transition',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border',
        link: 'hover:disabled:bg-transparent',
        ghost: 'border border-transparent',
      },
      color: {
        primary: '',
        secondary: '',
        neutral: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
      },
      size: {
        sm: 'text-sm p-2',
        md: 'text-sm p-2.5',
        lg: 'text-base p-3',
      },
    },
    compoundVariants: [
      {
        variant: 'solid', // checked
        color: 'primary',
        className:
          'bg-primary-solid text-neutral-0 hover:bg-primary-solid-hover focus:ring-4 focus:ring-primary-solid-focus disabled:bg-primary-solid-disable',
      },
      {
        variant: 'solid', // checked
        color: 'secondary',
        className:
          'bg-secondary-solid text-neutral-0 hover:bg-secondary-solid-hover focus:ring-4 focus:ring-secondary-solid-focus disabled:bg-secondary-solid-disable',
      },
      {
        variant: 'solid', // checked
        color: 'danger',
        className:
          'bg-danger-solid text-neutral-0 hover:bg-danger-solid-hover focus:ring-4 focus:ring-danger-solid-focus disabled:bg-danger-solid-disable',
      },
      {
        variant: 'solid', // checked
        color: 'success',
        className:
          'bg-success-solid text-neutral-0 hover:bg-success-solid-hover focus:ring-4 focus:ring-success-solid-focus disabled:bg-success-solid-disable',
      },
      {
        variant: 'solid', // checked
        color: 'warning',
        className:
          'bg-warning-solid text-neutral-0 hover:bg-warning-solid-hover focus:ring-4 focus:ring-warning-solid-focus disabled:bg-warning-solid-disable',
      },
      {
        variant: 'solid', // checked
        color: 'neutral',
        className:
          'bg-neutral-solid text-neutral-0 hover:bg-neutral-solid-hover focus:ring-4 focus:ring-neutral-solid-focus disabled:bg-neutral-solid-disable',
      },
      {
        variant: 'outline', // checked
        color: 'primary',
        className: [
          'bg-primary-outline',
          'text-primary-outline-fg',
          'border-primary-outline-border',
          'hover:bg-primary-outline-hover',
          'focus:ring-4',
          'focus:ring-primary-outline-active',
          'disabled:text-primary-400',
          'disabled:bg-primary-outline',
          'disabled:text-primary-outline-disable-fg',
        ],
      },
      {
        variant: 'outline',
        color: 'secondary',
        className: [
          'bg-secondary-outline',
          'text-secondary-outline-fg',
          'border-secondary-outline-border',
          'hover:bg-secondary-outline-hover',
          'focus:ring-4',
          'focus:ring-secondary-outline-active',
          'disabled:text-secondary-400',
          'disabled:bg-secondary-outline',
          'disabled:text-secondary-outline-disable-fg',
        ],
      },
      {
        variant: 'outline',
        color: 'success',
        className: [
          'bg-success-outline',
          'text-success-outline-fg',
          'border-success-outline-border',
          'hover:bg-success-outline-hover',
          'focus:ring-4',
          'focus:ring-success-outline-active',
          'disabled:text-success-400',
          'disabled:bg-success-outline',
          'disabled:text-success-outline-disable-fg',
        ],
      },
      {
        variant: 'outline',
        color: 'warning',
        className: [
          'bg-warning-outline',
          'text-warning-outline-fg',
          'border-warning-outline-border',
          'hover:bg-warning-outline-hover',
          'focus:ring-4',
          'focus:ring-warning-outline-active',
          'disabled:text-warning-400',
          'disabled:bg-warning-outline',
          'disabled:text-warning-outline-disable-fg',
        ],
      },
      {
        variant: 'outline',
        color: 'danger',
        className: [
          'bg-danger-outline',
          'text-danger-outline-fg',
          'border-danger-outline-border',
          'hover:bg-danger-outline-hover',
          'focus:ring-4',
          'focus:ring-danger-outline-active',
          'disabled:text-danger-400',
          'disabled:bg-danger-outline',
          'disabled:text-danger-outline-disable-fg',
        ],
      },
      {
        variant: 'outline',
        color: 'neutral',
        className: [
          'bg-neutral-outline',
          'text-neutral-outline-fg',
          'border-neutral-outline-border',
          'hover:bg-neutral-outline-hover',
          'focus:ring-4',
          'focus:ring-neutral-outline-active',
          'disabled:text-neutral-400',
          'disabled:bg-neutral-outline',
          'disabled:text-neutral-outline-disable-fg',
        ],
      },
      {
        variant: 'link',
        color: ['primary'],
        className: [
          'text-primary-plain-fg bg-transparent',
          'hover:bg-primary-plain-hover',
          'active:bg-primary-plain-active',
          'disabled:text-primary-plain-disable-fg',
        ],
      },
      {
        variant: 'link',
        color: ['secondary'],
        className: [
          'text-secondary-plain-fg bg-transparent',
          'hover:bg-secondary-plain-hover',
          'active:bg-secondary-plain-active',
          'disabled:text-secondary-plain-disable-fg',
        ],
      },
      {
        variant: 'link',
        color: ['success'],
        className: [
          'text-success-plain-fg bg-transparent',
          'hover:bg-success-plain-hover',
          'active:bg-success-plain-active',
          'disabled:text-success-plain-disable-fg',
        ],
      },
      {
        variant: 'link',
        color: ['warning'],
        className: [
          'text-warning-plain-fg bg-transparent',
          'hover:bg-warning-plain-hover',
          'active:bg-warning-plain-active',
          'disabled:text-warning-plain-disable-fg',
        ],
      },
      {
        variant: 'link',
        color: ['danger'],
        className: [
          'text-danger-plain-fg bg-transparent',
          'hover:bg-danger-plain-hover',
          'active:bg-danger-plain-active',
          'disabled:text-danger-plain-disable-fg',
        ],
      },
      {
        variant: 'link',
        color: ['neutral'],
        className: [
          'text-neutral-plain-fg bg-transparent',
          'hover:bg-neutral-plain-hover',
          'active:bg-neutral-plain-active',
          'disabled:text-neutral-plain-disable-fg',
        ],
      },
      {
        // NOTE: This variant is not semantic, will be remove later.
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

export type IconButtonStylesProps = VariantProps<typeof iconButtonCva>

const iconButton = { iconButtonCva }

export { iconButton }
