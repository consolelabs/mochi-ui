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
    'peer block flex-1 appearance-none outline-none bg-transparent relative z-[1] rounded shrink-0 py-2.5 caret-primary-600',
  ],
  {
    variants: {
      size: {
        md: 'h-10 text-sm',
        lg: 'h-[52px] text-md leading-snug',
      },
      disabled: {
        true: 'bg-neutral-100 text-neutral-500 cursor-not-allowed',
      },
      error: {
        true: 'border-red-700 focus:border-red-700 caret-red-700',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const slot = cva('flex justify-center items-center')

const mask = cva(
  [
    'absolute z-0 inset-0 rounded pointer-events-none	border border-neutral-300 peer-focus:border-primary-600',
  ],
  {
    variants: {
      disabled: {
        true: 'bg-neutral-400/20 text-neutral-500 cursor-not-allowed',
      },
      error: {
        true: 'border-red-700 peer-focus:border-red-700',
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
