import { cva, VariantProps } from 'class-variance-authority'

const root = cva('flex relative cursor-text overflow-hidden')

const inputVariants = cva(
  [
    'peer block p-0 w-full appearance-none outline-none bg-transparent relative z-[1] rounded shrink-0',
    // 'focus:outline-none rounded border border-neutral-300 shadow-input text-neutral-800 placeholder:text-neutral-500 ffocus:border-primary-600 ffocus:shadow-input-focused'
  ],
  {
    variants: {
      size: {
        md: 'h-10 text-sm',
        lg: 'h-12 text-md leading-snug',
      },
      disabled: {
        true: 'bg-neutral-100 text-neutral-500 cursor-not-allowed',
      },
      error: {
        true: 'border-red-700 focus:border-red-700 focus:shadow-input',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const mask = cva(
  [
    'absolute z-0 inset-0 rounded pointer-events-none	border border-neutral-300 peer-focus:border-primary-600  peer-focus:shadow-input-focused',
  ],
  {
    variants: {
      disabled: {
        true: 'bg-neutral-100 text-neutral-500 cursor-not-allowed',
      },
      error: {
        true: 'border-red-700 peer-focus:border-red-700 peer-focus:shadow-input',
      },
      // error: {
      //   true: 'focus:shadow-input',
      // },
    },
    defaultVariants: {
      error: false,
    },
  },
)

export const input = {
  inputVariants,
  root,
  mask,
}

export type InputStylesProps = VariantProps<typeof inputVariants>
