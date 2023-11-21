import { cva, VariantProps } from 'class-variance-authority'

const inputWrapperVariants = cva(
  [
    'flex',
    'items-center',
    'gap-x-2',
    'rounded',
    'border',
    'shadow-input',
    'border-neutral-outline-border',
    'focus-within:border-primary-solid',
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
        true: 'border-danger-solid focus-within:border-danger-solid',
        false: ['focus-within:ring-primary-solid/10', 'focus-within:ring-4'],
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
    'flex-1 border-none outline-none text-text-primary placeholder:text-text-secondary disabled:bg-transparent disabled:text-text-secondary',
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
  ['mt-2 text-xs tracking-tight text-text-secondary'],
  {
    variants: {
      error: {
        true: 'text-danger-solid',
      },
    },
  },
)

const adornmentVariants = cva(['text-text-primary'], {
  variants: {
    size: {
      base: 'text-sm',
      large: 'text-md leading-snug',
    },
    disabled: {
      true: 'text-text-secondary',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

const labelClassName =
  'mb-2 font-bold leading-4 tracking-tight uppercase text-text-secondary text-xxs'

export const inputfield = {
  inputWrapperVariants,
  inputFieldVariants,
  helperTextVariants,
  adornmentVariants,
  labelClassName,
}

export type InputWrapperStylesProps = VariantProps<typeof inputWrapperVariants>
