import { cva, VariantProps } from 'class-variance-authority'

const root = cva(
  [
    'flex relative items-stretch cursor-text overflow-hidden focus-within:shadow-input-focused rounded gap-2 px-3.5',
  ],
  {
    variants: {
      error: {
        true: 'focus-within:shadow-none',
      },
    },
  },
)

const inputVariants = cva(
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
        true: '!caret-danger-outline-fg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const slot = cva('relative z-[1] flex justify-center items-center')

const mask = cva(
  [
    'absolute z-0 inset-0 rounded pointer-events-none border border-neutral-outline-border peer-focus:border-primary-outline-fg',
  ],
  {
    variants: {
      disabled: {
        true: 'bg-neutral-outline cursor-not-allowed',
      },
      error: {
        true: '!border-danger-outline-fg peer-focus:!border-danger-outline-fg',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)

export const input = {
  inputVariants,
  root,
  slot,
  mask,
}

export type InputStylesProps = VariantProps<typeof inputVariants>
