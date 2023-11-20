import { DateRange } from 'react-day-picker'
import { DayPicker } from '../date-picker'
import { useDayRangeInput } from '../hooks'
import { CalendarCaption } from '../calendar-caption'
import { DayRangePickerWithInputProps } from '../type'
import { HeadWithRangeInput } from './head-range-input'
import { InputControllProvider } from './context'

const emptyRange = {
  from: undefined,
  to: undefined,
}

const dumpOnSelect = (_: DateRange) => {}

export const DayRangePickerWithInput = (
  props: DayRangePickerWithInputProps,
) => {
  const {
    dayTextFormat = 'dd/MM/yyyy',
    selected = emptyRange,
    onSelect = dumpOnSelect,
    fromDate,
    toDate,
    fromMonth,
    toMonth,
    fromYear,
    toYear,
    locale,
    today,
    ...restProps
  } = props

  const { dayPickerProps, ...passedInputProps } = useDayRangeInput({
    dayTextFormat,
    selectedRange: selected,
    onRangeChanged: onSelect,
    fromDate,
    toDate,
    fromMonth,
    toMonth,
    fromYear,
    toYear,
    locale,
    today,
  })

  return (
    <InputControllProvider {...passedInputProps}>
      <DayPicker
        {...dayPickerProps}
        {...restProps}
        components={{
          Caption: CalendarCaption,
          Head: HeadWithRangeInput,
        }}
      />
    </InputControllProvider>
  )
}
