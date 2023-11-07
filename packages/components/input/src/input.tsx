import { input, InputWrapperProps } from '@consolelabs/theme'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLInputElement> &
  InputWrapperProps & {
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
  const { inputWrapperCva, inputCva, adornmentCva, helperTextCva } = input
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
