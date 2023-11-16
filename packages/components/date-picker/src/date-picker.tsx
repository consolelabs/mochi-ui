import { DayPicker, DateRange as PrimitiveDateRange } from 'react-day-picker'
import clsx from 'clsx'
import { dayPicker } from '@consolelabs/theme'
import { CalendarCaption } from './calendar-caption'
import { formatWeekdayName } from './utils'

export type DateRange = PrimitiveDateRange

export type DatePickerProps = React.ComponentProps<typeof DayPicker> & {
  alignCaptionCenter?: boolean
  paddingSize?: 'md' | 'lg'
}

function DatePicker(props: DatePickerProps) {
  const {
    showOutsideDays = true,
    className,
    classNames,
    alignCaptionCenter,
    components: customComponents,
    paddingSize = 'md',
  } = props

  return (
    <DayPicker
      formatters={{
        formatWeekdayName,
      }}
      style={{ width: 224 }}
      weekStartsOn={1}
      showOutsideDays={showOutsideDays}
      className={clsx(
        dayPicker.wrapper,
        {
          [dayPicker.wrapperMdPadding]: paddingSize === 'md',
          [dayPicker.wrapperLgPadding]: paddingSize === 'lg',
        },
        className,
      )}
      classNames={{
        table: dayPicker.table,
        head_row: dayPicker.headRow,
        head_cell: dayPicker.headCell,
        row: dayPicker.row,
        cell: dayPicker.cell,
        day: dayPicker.day,
        day_range_start: dayPicker.dayRangeStart,
        day_range_end: dayPicker.dayRangeEnd,
        day_selected: dayPicker.daySelect,
        day_today: dayPicker.dayToday,
        day_outside: dayPicker.dayOutSide,
        day_disabled: dayPicker.dayDisabled,
        day_range_middle: dayPicker.dayRangeMiddle,
        day_hidden: dayPicker.dayHidden,
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        Caption: (props) => (
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <CalendarCaption {...props} alignCaptionCenter={alignCaptionCenter} />
        ),
        ...customComponents,
      }}
      {...props}
    />
  )
}
DatePicker.displayName = 'DatePicker'

export { DatePicker }
export default DatePicker
