import { cva, VariantProps } from 'class-variance-authority'

const root = cva(
  [
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors',
    'data-[state=unchecked]:bg-neutral-300 data-[state=unchecked]:enabled:hover:bg-neutral-400',
    'disabled:cursor-not-allowed data-[state=unchecked]:disabled:bg-neutral-200',
  ],
  {
    variants: {
      color: {
        primary: [
          'data-[state=checked]:bg-primary-solid',
          'focus-visible:outline-none focus-visible:shadow-small focus-visible:shadow-primary-solid-focus/20',
        ],
        secondary: [
          'data-[state=checked]:bg-secondary-solid',
          'focus-visible:outline-none focus-visible:shadow-small focus-visible:shadow-secondary-solid-focus/20',
        ],
        success: [
          'data-[state=checked]:bg-success-solid',
          'focus-visible:outline-none focus-visible:shadow-small focus-visible:shadow-success-solid-focus/20',
        ],
        warning: [
          'data-[state=checked]:bg-warning-solid',
          'focus-visible:outline-none focus-visible:shadow-small focus-visible:shadow-warning-solid-focus/20',
        ],
        danger: [
          'data-[state=checked]:bg-danger-solid',
          'focus-visible:outline-none focus-visible:shadow-small focus-visible:shadow-danger-solid-focus/20',
        ],
        neutral: [
          'data-[state=checked]:bg-neutral-solid',
          'focus-visible:outline-none focus-visible:shadow-small focus-visible:shadow-neutral-solid-focus/20',
        ],
      },
      size: {
        sm: 'w-9 h-5 px-0.5',
        md: 'w-11 h-6 px-1',
      },
    },
    compoundVariants: [
      {
        color: [
          'primary',
          'secondary',
          'success',
          'warning',
          'danger',
          'neutral',
        ],
        className: 'data-[state=checked]:disabled:opacity-50',
      },
    ],
    defaultVariants: {
      size: 'sm',
      color: 'primary',
    },
  },
)

const thumb = cva(
  [
    'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
    'data-[state=unchecked]:translate-x-0',
  ],
  {
    variants: {
      size: {
        sm: 'data-[state=checked]:translate-x-[16px]',
        md: 'data-[state=checked]:translate-x-[20px]',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
)

export type SwitchStylesProps = VariantProps<typeof root>

const switchButton = {
  root,
  thumb,
}

export { switchButton }
