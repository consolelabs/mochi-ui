import { DateRange, Head } from 'react-day-picker'
import { rangeInputGroup } from '@consolelabs/theme'
import clsx from 'clsx'
import { DayPicker } from './date-picker'
import { useDayRangeInput } from './hooks'
import { CalendarCaption } from './calendar-caption'
import { DayRangePickerWithInputProps } from './type'

const emptyRange = {
  from: undefined,
  to: undefined,
}

const dumpOnSelect = (_: DateRange) => {}

export const DayRangePickerWithInput = (
  props: DayRangePickerWithInputProps,
) => {
  const {
    textFormat = 'dd/MM/yyyy',
    selected = emptyRange,
    onSelect = dumpOnSelect,
    inputProps,
    ...restProps
  } = props

  const { fromInputProps, toInputProps, dayPickerProps } = useDayRangeInput(
    selected,
    textFormat,
    onSelect,
  )

  const inputGroup = (
    <div className={rangeInputGroup.wrapper}>
      <input
        {...fromInputProps}
        className={clsx(rangeInputGroup.input, inputProps?.className)}
        placeholder={inputProps?.placeholder}
      />
      <div className={rangeInputGroup.divider} />
      <input
        {...toInputProps}
        className={clsx(rangeInputGroup.input, inputProps?.className)}
        placeholder={inputProps?.placeholder}
      />
    </div>
  )

  return (
    <DayPicker
      {...dayPickerProps}
      {...restProps}
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        Caption: (props) => <CalendarCaption {...props} alignCaptionCenter />,
        // eslint-disable-next-line react/no-unstable-nested-components
        Head: () => (
          <div className="flex flex-col gap-3">
            {inputGroup}
            <Head />
          </div>
        ),
      }}
    />
  )
}
