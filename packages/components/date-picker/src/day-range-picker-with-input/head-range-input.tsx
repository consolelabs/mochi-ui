import { rangeInputGroup } from '@consolelabs/theme'
import clsx from 'clsx'
import { Head } from 'react-day-picker'
import { useInputProps } from './context'

export const HeadWithRangeInput = () => {
  const { fromInputProps, toInputProps } = useInputProps()

  const inputProps = {
    className: '',
  }

  // FIXME: Use own Input Field component
  const inputGroup = (
    <div className={rangeInputGroup.wrapper}>
      <input
        {...fromInputProps}
        className={clsx(rangeInputGroup.input, inputProps?.className)}
      />
      <div className={rangeInputGroup.divider} />
      <input
        {...toInputProps}
        className={clsx(rangeInputGroup.input, inputProps?.className)}
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
