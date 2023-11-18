import { DayPicker as PrimitiveDayPicker } from 'react-day-picker'
import clsx from 'clsx'
import { dayPicker } from '@consolelabs/theme'
import { CalendarCaption } from './calendar-caption'
import { formatWeekdayName, calendarStyleClassNames } from './utils'
import { DayPickerProps } from './type'
import { DayPickerStylePropsProvider } from './context'

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

  // NOTE: Use context provider to pass props to customer component instead
  // to prevent mount loosing focus input field in component.
  return (
    <DayPickerStylePropsProvider alignCaptionCenter={alignCaptionCenter}>
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
          Caption: CalendarCaption,
          ...customComponents,
        }}
        {...restProps}
      />
    </DayPickerStylePropsProvider>
  )
}
DayPicker.displayName = 'DayPicker'

export { DayPicker }
export default DayPicker
