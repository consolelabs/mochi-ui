import { cva, VariantProps } from 'class-variance-authority'

const inputWrapperCva = cva(
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

const inputCva = cva(
  [
    'flex-1 border-none outline-0 text-neutral-800 placeholder:text-neutral-500 disabled:bg-transparent disabled:text-neutral-500',
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

const helperTextCva = cva(['mt-2 text-xs tracking-tight text-neutral-600'], {
  variants: {
    error: {
      true: 'text-red-700',
    },
  },
})

const adornmentCva = cva(['text-neutral-800'], {
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

const input = {
  inputWrapperCva,
  inputCva,
  helperTextCva,
  adornmentCva,
}

export type InputWrapperProps = VariantProps<typeof inputWrapperCva>

export { input }
