import { ChangeEventHandler } from 'react'
import {
  DateRange,
  DayPickerBase,
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
    dayTextFormat?: string
    onSelect?: (_: DateRange) => void
    inputProps?: {
      className?: string
      placeholder?: string
    }
  }

export interface UseCleanSelectRangeProps
  extends Pick<
    DayPickerBase,
    'fromDate' | 'toDate' | 'fromMonth' | 'toMonth' | 'fromYear' | 'toYear'
  > {
  selectedRange: DateRange
}

export interface UseDayRangeInputProps
  extends Pick<
    DayPickerBase,
    | 'fromDate'
    | 'toDate'
    | 'fromMonth'
    | 'toMonth'
    | 'fromYear'
    | 'toYear'
    | 'today'
    | 'locale'
  > {
  selectedRange: DateRange
  onRangeChanged: (_: DateRange) => void
  dayTextFormat: string
}

export interface UseDayRangeInputReturn {
  fromInputProps: {
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
  }
  toInputProps: {
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
  }
  dayPickerProps: Pick<
    DayPickerRangeProps,
    | 'month'
    | 'mode'
    | 'onSelect'
    | 'onMonthChange'
    | 'locale'
    | 'fromDate'
    | 'toDate'
    | 'today'
    | 'selected'
  >
  setMonth: (_: Date) => void
  inputState: {
    isValid: boolean
    isFromDateValid: boolean
    isToDateValid: boolean
  }
}
