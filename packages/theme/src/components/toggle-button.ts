import { VariantProps, cva } from 'class-variance-authority'

const toggleButtonVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0',
    'border',
    'disabled:cursor-not-allowed',
    'transition',
    'focus:outline-none',
    'focus-visible:shadow-small',
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
          'data-[disabled]:border-primary-outline-disable-border',
        ],
        secondary: [
          'border-secondary-outline-border',
          'text-secondary-outline-fg',
          'data-[state=on]:bg-secondary-outline-active',
          'hover:enabled:bg-secondary-outline-hover',
          'data-[disabled]:text-secondary-outline-disable-fg',
          'data-[disabled]:border-secondary-outline-disable-border',
        ],
        success: [
          'border-success-outline-border',
          'text-success-outline-fg',
          'data-[state=on]:bg-success-outline-active',
          'hover:enabled:bg-success-outline-hover',
          'data-[disabled]:text-success-outline-disable-fg',
          'data-[disabled]:border-success-outline-disable-border',
        ],
        warning: [
          'border-warning-outline-border',
          'text-warning-outline-fg',
          'data-[state=on]:bg-warning-outline-active',
          'hover:enabled:bg-warning-outline-hover',
          'data-[disabled]:text-warning-outline-disable-fg',
          'data-[disabled]:border-warning-outline-disable-border',
        ],
        danger: [
          'border-danger-outline-border',
          'text-danger-outline-fg',
          'data-[state=on]:bg-danger-outline-active',
          'hover:enabled:bg-danger-outline-hover',
          'data-[disabled]:text-danger-outline-disable-fg',
          'data-[disabled]:border-danger-outline-disable-border',
        ],
        neutral: [
          'border-neutral-outline-border',
          'text-neutral-outline-fg',
          'data-[state=on]:bg-neutral-outline-active',
          'hover:enabled:bg-neutral-outline-hover',
          'data-[disabled]:text-neutral-outline-disable-fg',
          'data-[disabled]:border-neutral-outline-disable-border',
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
