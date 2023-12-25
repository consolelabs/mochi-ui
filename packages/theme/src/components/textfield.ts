import { cva, VariantProps } from 'class-variance-authority'

const root = cva(
  [
    'flex relative items-stretch cursor-text overflow-hidden rounded gap-2 px-3.5 min-w-max',
  ],
  {
    variants: {
      error: {
        true: 'focus-within:shadow-none',
        false: 'focus-within:shadow-input-focused',
      },
    },
  },
)

const textFieldVariants = cva(
  [
    'peer block flex-1 appearance-none outline-none bg-transparent relative z-[1] rounded shrink-0 py-2.5 caret-primary-outline-fg placeholder:text-text-secondary',
  ],
  {
    variants: {
      size: {
        md: 'h-10 text-sm',
        lg: 'h-[52px] text-md leading-snug',
      },
      disabled: {
        true: 'text-text-secondary cursor-not-allowed',
      },
      error: {
        true: '!caret-danger-solid-focus',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const slot = cva('relative z-[1] flex justify-center items-center shrink-0')

const mask = cva(
  [
    'absolute z-0 inset-0 rounded pointer-events-none border border-divider peer-focus:border-primary-solid-focus',
  ],
  {
    variants: {
      disabled: {
        true: 'bg-neutral-outline cursor-not-allowed',
      },
      error: {
        true: '!border-danger-solid-focus peer-focus:!border-danger-solid-focus',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)

export const textfield = {
  textFieldVariants,
  root,
  slot,
  mask,
}

export type TextFieldStylesProps = VariantProps<typeof textFieldVariants>
