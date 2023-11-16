import { DayPicker, DateRange as PrimitiveDateRange } from 'react-day-picker'
import clsx from 'clsx'
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
      style={{ width: 244 }}
      weekStartsOn={1}
      showOutsideDays={showOutsideDays}
      className={clsx(
        'rounded space-y-3',
        {
          'p-3': paddingSize === 'md',
          'p-5': paddingSize === 'lg',
        },
        className,
      )}
      classNames={{
        table: 'w-full border-collapse',
        head_row: 'flex text-xs',
        head_cell: clsx([
          'font-normal',
          'h-8 w-8',
          'flex items-center justify-center',
          'text-neutral-800',
          'tracking-tight',
        ]),
        row: 'flex w-full mt-1',
        cell: clsx([
          'block',
          'h-fit',
          'w-fit',
          'p-0',
          'text-neutral-800',
          '![&:has(>.day-range-middle)]:bg-neutral-150',
          '![&:has(>.day-range-start)]:rounded-l-full',
          '![&:has(>.day-range-end)]:rounded-r-full',
        ]),
        day: clsx(
          'h-8 w-8',
          'relative',
          'text-xs',
          'rounded-full',
          'transition',
          'duration-100',
          'hover:bg-neutral-150',

          'relative',
          '!after:flex',
          '!after:content-[asd]',
          'after:absolute after:bottom-1 after:left-1',
          'after:w-1 after:h-1 after:bg-primary-700',
        ),
        day_range_start: clsx([
          'day-range-start',
          'bg-primary-700',
          'text-white',
          'hover:bg-primary-700',
        ]),
        day_range_end: clsx([
          'day-range-end',
          'bg-primary-700',
          'text-white',
          'hover:bg-primary-700',
        ]),
        day_selected: clsx([
          {
            'bg-primary-700 text-white hover:bg-primary-700':
              props.mode !== 'range',
          },
        ]),
        day_today: clsx(['font-semibold']),
        day_outside: clsx(['text-neutral-400']),
        day_disabled: 'text-neutral-400',
        day_range_middle: 'day-range-middle',
        day_hidden: 'invisible',
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
