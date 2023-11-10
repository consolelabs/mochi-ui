import { cva, VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  [
    'flex-1 h-fit outline-0 rounded border border-neutral-300 shadow-input text-neutral-800 placeholder:text-neutral-500 focus:border-primary-600 focus:shadow-input-focused',
  ],
  {
    variants: {
      size: {
        base: 'px-3.5 py-2.5 text-sm',
        large: 'px-4 py-3.5 text-md leading-snug',
      },
      disabled: {
        true: 'bg-neutral-100 text-neutral-500 cursor-not-allowed',
      },
      error: {
        true: 'border-red-700 focus:border-red-700 focus:shadow-input',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
)

export const input = {
  inputVariants,
}

export type InputProps = VariantProps<typeof inputVariants>
