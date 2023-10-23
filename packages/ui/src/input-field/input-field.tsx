import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const inputWrapperCva = cva(
  [
    'ui-flex ui-items-center ui-gap-x-2 ui-rounded ui-border ui-border-neutral-300 ui-shadow-input ui-focus-within:border-primary-600 ui-focus-within:shadow-input-focused',
  ],
  {
    variants: {
      size: {
        base: 'ui-px-3.5 ui-py-2.5',
        large: 'ui-px-4 ui-py-3.5',
      },
      disabled: {
        true: 'ui-bg-neutral-100',
      },
      error: {
        true: 'ui-border-red-700 ui-focus-within:border-red-700 ui-focus-within:shadow-input',
      },
      hasStartAdornment: {
        true: 'ui-pl-0',
      },
      hasEndAdornment: {
        true: 'ui-pr-0',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
)

const inputCva = cva(
  [
    'ui-flex-1 ui-border-none ui-outline-0 ui-text-neutral-800 ui-placeholder:text-neutral-500 ui-disabled:bg-transparent ui-disabled:text-neutral-500',
  ],
  {
    variants: {
      size: {
        base: 'ui-text-sm',
        large: 'ui-text-md ui-leading-snug',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
)

const helperTextCva = cva(
  ['ui-mt-2 ui-text-xs ui-tracking-tight ui-text-neutral-600'],
  {
    variants: {
      error: {
        true: 'ui-text-red-700',
      },
    },
  },
)

const adornmentCva = cva(['ui-text-neutral-800'], {
  variants: {
    size: {
      base: 'ui-text-sm',
      large: 'ui-text-md ui-leading-snug',
    },
    disabled: {
      true: 'ui-text-neutral-500',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

type Props = VariantProps<typeof inputWrapperCva> & {
  id?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  label?: React.ReactNode
  helperText?: React.ReactNode
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  disabled?: boolean
  error?: boolean
  className?: string
}

export default function InputField({
  id,
  value,
  defaultValue,
  placeholder,
  label,
  helperText,
  startAdornment,
  endAdornment,
  disabled,
  error,
  size,
  className,
}: Props) {
  return (
    <div className={className}>
      {Boolean(label) && (
        <div className="ui-text-neutral-500 ui-text-xxs ui-font-bold ui-leading-4 ui-tracking-tight ui-uppercase ui-mb-2">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div
        className={inputWrapperCva({
          size,
          disabled,
          error,
          hasStartAdornment: Boolean(startAdornment),
          hasEndAdornment: Boolean(endAdornment),
        })}
      >
        {Boolean(startAdornment) && (
          <div className={adornmentCva({ size, disabled })}>
            {startAdornment}
          </div>
        )}
        <input
          className={inputCva({ size })}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          value={value}
        />
        {Boolean(endAdornment) && (
          <div className={adornmentCva({ size, disabled })}>{endAdornment}</div>
        )}
      </div>
      {Boolean(helperText) && (
        <div className={helperTextCva({ error })}>{helperText}</div>
      )}
    </div>
  )
}
