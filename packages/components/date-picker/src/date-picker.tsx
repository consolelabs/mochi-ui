import { DayPicker as PrimitiveDayPicker } from 'react-day-picker'
import clsx from 'clsx'
import { dayPicker } from '@consolelabs/theme'
import { CalendarCaption } from './calendar-caption'
import { formatWeekdayName, calendarStyleClassNames } from './utils'
import { DayPickerProps } from './type'

function DayPicker(props: DayPickerProps) {
  const {
    showOutsideDays = true,
    className,
    classNames,
    alignCaptionCenter,
    components: customComponents,
    paddingSize = 'md',
    hasShadow = false,
    ...restProps
  } = props

  return (
    <PrimitiveDayPicker
      formatters={{
        formatWeekdayName,
      }}
      weekStartsOn={1}
      showOutsideDays={showOutsideDays}
      className={clsx(
        dayPicker.wrapper,
        {
          [dayPicker.wrapperShadow]: hasShadow,
          [dayPicker.wrapperMdPadding]: paddingSize === 'md',
          [dayPicker.wrapperLgPadding]: paddingSize === 'lg',
        },
        className,
      )}
      classNames={{
        ...calendarStyleClassNames,
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        Caption: (props) => (
          <CalendarCaption {...props} alignCaptionCenter={alignCaptionCenter} />
        ),
        ...customComponents,
      }}
      {...restProps}
    />
  )
}
DayPicker.displayName = 'DayPicker'

export { DayPicker }
export default DayPicker
