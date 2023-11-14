import { cva, VariantProps } from 'class-variance-authority'

const inputWrapperVariants = cva(
  [
    'flex items-center gap-x-2 rounded border border-neutral-300 shadow-input focus-within:border-primary-600 focus-within:shadow-input-focused',
  ],
  {
    variants: {
      size: {
        base: 'px-3.5 py-2.5',
        large: 'px-4 py-3.5',
      },
      disabled: {
        true: 'bg-neutral-100',
      },
      error: {
        true: 'border-red-700 focus-within:border-red-700 focus-within:shadow-input',
      },
      hasStartAdornment: {
        true: 'pl-0',
      },
      hasEndAdornment: {
        true: 'pr-0',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
)

const inputFieldVariants = cva(
  [
    'flex-1 border-none outline-none text-neutral-800 placeholder:text-neutral-500 disabled:bg-transparent disabled:text-neutral-500',
  ],
  {
    variants: {
      size: {
        base: 'text-sm',
        large: 'text-md leading-snug',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
)

const helperTextVariants = cva(
  ['mt-2 text-xs tracking-tight text-neutral-600'],
  {
    variants: {
      error: {
        true: 'text-red-700',
      },
    },
  },
)

const adornmentVariants = cva(['text-neutral-800'], {
  variants: {
    size: {
      base: 'text-sm',
      large: 'text-md leading-snug',
    },
    disabled: {
      true: 'text-neutral-500',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

const labelClassName =
  'mb-2 font-bold leading-4 tracking-tight uppercase text-neutral-500 text-xxs'

export const inputfield = {
  inputWrapperVariants,
  inputFieldVariants,
  helperTextVariants,
  adornmentVariants,
  labelClassName,
}

export type InputWrapperStylesProps = VariantProps<typeof inputWrapperVariants>
