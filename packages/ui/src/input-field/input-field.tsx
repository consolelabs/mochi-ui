import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

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

type Props = HTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputWrapperCva> & {
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
  ...rest
}: Props) {
  return (
    <div className={className}>
      {Boolean(label) && (
        <div className="text-neutral-500 text-xxs font-bold leading-4 tracking-tight uppercase mb-2">
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
          {...rest}
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
