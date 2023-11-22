import { VariantProps, cva } from 'class-variance-authority'

const toggleButtonVariants = cva(
  [
    'border',
    'rounded',
    'px-2',
    'py-1',
    'disabled:cursor-not-allowed',
    'transition',
    'bg-transparent',
    'disabled:text-text-secondary',
    'disabled:bg-white',
    'disabled:border-neutral-outline',
  ],
  {
    variants: {
      appearance: {
        primary: [
          'border-primary-outline-border',
          'data-[state=on]:bg-primary-solid',
          'data-[state=on]:text-primary-solid-fg',
          'hover:bg-primary-outline-hover',
          'text-text-primary',
        ],
        secondary: [
          'border-secondary-outline-border',
          'data-[state=on]:bg-secondary-solid',
          'data-[state=on]:text-secondary-solid-fg',
          'hover:bg-secondary-outline-hover',
          'text-text-primary',
        ],
        success: [
          'border-success-outline-border',
          'data-[state=on]:bg-success-solid',
          'data-[state=on]:text-success-solid-fg',
          'hover:bg-success-outline-hover',
          'text-text-success',
        ],
        warning: [
          'border-warning-outline-border',
          'data-[state=on]:bg-warning-solid',
          'data-[state=on]:text-warning-solid-fg',
          'hover:bg-warning-outline-hover',
          'text-text-warning',
        ],
        danger: [
          'border-danger-outline-border',
          'data-[state=on]:bg-danger-solid',
          'data-[state=on]:text-danger-solid-fg',
          'hover:bg-danger-outline-hover',
          'text-text-danger',
        ],
        neutral: [
          'border-neutral-outline-border',
          'data-[state=on]:bg-neutral-solid',
          'data-[state=on]:text-neutral-solid-fg',
          'hover:bg-neutral-outline-hover',
          'text-text-neutral',
        ],
      },
    },
    defaultVariants: {
      appearance: 'primary',
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
