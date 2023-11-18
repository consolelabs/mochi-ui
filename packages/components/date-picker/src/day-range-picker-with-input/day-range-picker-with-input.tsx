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
    textFormat = 'dd/MM/yyyy',
    selected = emptyRange,
    onSelect = dumpOnSelect,
    ...restProps
  } = props

  const { dayPickerProps, ...pairInputProps } = useDayRangeInput(
    selected,
    textFormat,
    onSelect,
  )

  return (
    <InputControllProvider {...pairInputProps}>
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
