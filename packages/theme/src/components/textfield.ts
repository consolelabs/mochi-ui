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
      disabled: {
        true: 'bg-neutral-solid-disable',
      },
    },
  },
)

const textFieldVariants = cva(
  [
    'peer block flex-1 appearance-none outline-none bg-transparent relative z-[1] rounded shrink-0 py-2.5 caret-primary-outline-fg placeholder:text-text-disabled',
  ],
  {
    variants: {
      size: {
        md: 'h-10 text-sm',
        lg: 'h-[52px] text-md leading-snug',
      },
      disabled: {
        true: 'text-text-disabled cursor-not-allowed',
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

const slot = cva('relative z-[1] flex justify-center items-center shrink-0')

const mask = cva(
  [
    'absolute z-0 inset-0 rounded pointer-events-none',
    'border border-neutral-outline-border',
    'peer-focus:border-primary-solid-focus',
    'peer-hover:border-primary-solid-focus',
  ],
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed',
      },
      error: {
        true: '!border-danger-outline-border peer-focus:!border-danger-outline-border peer-hover:!border-danger-outline-border',
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
