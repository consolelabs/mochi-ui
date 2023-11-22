import { VariantProps, cva } from 'class-variance-authority'

const toggleButtonVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0',
    'border',
    'disabled:cursor-not-allowed',
    'transition',
    'focus:ring-2',
    'focus:outline-none',
  ],
  {
    variants: {
      appearance: {
        primary: [
          'border-primary-outline-border',
          'text-primary-outline-fg',
          'data-[state=on]:bg-primary-outline-active',
          'hover:enabled:bg-primary-outline-hover',
          'data-[disabled]:text-primary-outline-disable-fg',
          'focus:ring-primary-solid-focus',
        ],
        secondary: [
          'border-secondary-outline-border',
          'text-secondary-outline-fg',
          'data-[state=on]:bg-secondary-outline-active',
          'hover:enabled:bg-secondary-outline-hover',
          'data-[disabled]:text-secondary-outline-disable-fg',
          'focus:ring-secondary-solid-focus',
        ],
        success: [
          'border-success-outline-border',
          'text-success-outline-fg',
          'data-[state=on]:bg-success-outline-active',
          'hover:enabled:bg-success-outline-hover',
          'data-[disabled]:text-success-outline-disable-fg',
          'focus:ring-success-solid-focus',
        ],
        warning: [
          'border-warning-outline-border',
          'text-warning-outline-fg',
          'data-[state=on]:bg-warning-outline-active',
          'hover:enabled:bg-warning-outline-hover',
          'data-[disabled]:text-warning-outline-disable-fg',
          'focus:ring-warning-solid-focus',
        ],
        danger: [
          'border-danger-outline-border',
          'text-danger-outline-fg',
          'data-[state=on]:bg-danger-outline-active',
          'hover:enabled:bg-danger-outline-hover',
          'data-[disabled]:text-danger-outline-disable-fg',
          'focus:ring-danger-solid-focus',
        ],
        neutral: [
          'border-neutral-outline-border',
          'text-neutral-outline-fg',
          'data-[state=on]:bg-neutral-outline-active',
          'hover:enabled:bg-neutral-outline-hover',
          'data-[disabled]:text-neutral-outline-disable-fg',
          'focus:ring-neutral-solid-focus',
        ],
      },
      size: {
        sm: 'text-sm w-9 h-9 rounded',
        md: 'text-sm w-11 h-11 rounded',
        lg: 'text-base w-[52px] h-[52px] rounded-md',
      },
    },
    defaultVariants: {
      appearance: 'primary',
      size: 'md',
    },
  },
)

const toggleButtonGroupVariants = cva(['flex gap-x-2'])

export const toggleButton = {
  toggleButtonVariants,
  toggleButtonGroupVariants,
}

export type ToggleButtonStylesProps = VariantProps<typeof toggleButtonVariants>
export type ToggleButtonGroupStylesProps = VariantProps<
  typeof toggleButtonGroupVariants
>
