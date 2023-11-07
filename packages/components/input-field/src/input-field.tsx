import { inputfield, InputWrapperProps } from '@consolelabs/theme'
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
  const {
    inputWrapperVariants,
    inputFieldVariants,
    helperTextVariants,
    adornmentVariants,
    labelClassName,
  } = inputfield

  return (
    <div className={className}>
      {Boolean(label) && (
        <div className={labelClassName}>
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div
        className={inputWrapperVariants({
          size,
          disabled,
          error,
          hasStartAdornment: Boolean(startAdornment),
          hasEndAdornment: Boolean(endAdornment),
        })}
      >
        {Boolean(startAdornment) && (
          <div className={adornmentVariants({ size, disabled })}>
            {startAdornment}
          </div>
        )}
        <input
          className={inputFieldVariants({ size })}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          value={value}
          {...rest}
        />
        {Boolean(endAdornment) && (
          <div className={adornmentVariants({ size, disabled })}>
            {endAdornment}
          </div>
        )}
      </div>
      {Boolean(helperText) && (
        <div className={helperTextVariants({ error })}>{helperText}</div>
      )}
    </div>
  )
}
