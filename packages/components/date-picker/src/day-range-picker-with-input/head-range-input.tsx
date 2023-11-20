import { rangeInputGroup } from '@consolelabs/theme'
import clsx from 'clsx'
import { Head } from 'react-day-picker'
import { useInputProps } from './context'

export const HeadWithRangeInput = () => {
  const { fromInputProps, toInputProps, inputState } = useInputProps()

  const { isFromDateValid, isToDateValid } = inputState

  const inputProps = {
    className: '',
  }

  // FIXME: Use own Input Field component
  const inputGroup = (
    <div className={rangeInputGroup.wrapper}>
      <input
        {...fromInputProps}
        className={clsx(rangeInputGroup.input, inputProps?.className, {
          [rangeInputGroup.error]: !isFromDateValid,
        })}
      />
      <div className={rangeInputGroup.divider} />
      <input
        {...toInputProps}
        className={clsx(rangeInputGroup.input, inputProps?.className, {
          [rangeInputGroup.error]: !isToDateValid,
        })}
      />
    </div>
  )
  return (
    <div className="flex flex-col gap-3">
      {inputGroup}
      <Head />
    </div>
  )
}
