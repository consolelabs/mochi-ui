import {
  DateRange,
  DayPickerRangeProps,
  DayPicker as PrimitiveDayPicker,
} from 'react-day-picker'

export type DayPickerStyleProps = {
  alignCaptionCenter?: boolean
  paddingSize?: 'md' | 'lg'
  hasShadow?: boolean
}

export type DayPickerProps = React.ComponentProps<typeof PrimitiveDayPicker> &
  DayPickerStyleProps

export type DayRangePickerWithInputProps = Omit<
  DayPickerRangeProps,
  'mode' | 'onSelect'
> &
  DayPickerStyleProps & {
    textFormat?: string
    onSelect?: (_: DateRange) => void
    inputProps?: {
      className?: string
      placeholder?: string
    }
  }
