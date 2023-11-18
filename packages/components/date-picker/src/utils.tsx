import { format, endOfMonth, startOfDay, startOfMonth } from 'date-fns'
import { DateFormatter, DayPickerBase } from 'react-day-picker'
import { dayPicker } from '@consolelabs/theme'
import { FC, PropsWithChildren, createContext, useContext } from 'react'

export const DEFAULT_DATE_FORMAT = 'MMM dd, yyyy'
export const DEFAULT_DATE_TIME_FORMAT = 'PPpp'

export const formatWeekdayName: DateFormatter = (date, options) => {
  return format(date, 'EEE', { locale: options?.locale })
}

export const defaultFormatInputDate = (date: Date) => {
  return format(date, DEFAULT_DATE_FORMAT)
}

export const defaultFormatInputDateTime = (date: Date) => {
  return format(date, DEFAULT_DATE_TIME_FORMAT)
}

export function isValidDate(day: Date): boolean {
  return !Number.isNaN(day.getTime())
}

export const calendarStyleClassNames = {
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
}

export function parseFromToProps(
  props: Pick<
    DayPickerBase,
    'fromYear' | 'toYear' | 'fromDate' | 'toDate' | 'fromMonth' | 'toMonth'
  >,
): { fromDate: Date | undefined; toDate: Date | undefined } {
  const { fromYear, toYear, fromMonth, toMonth } = props
  let { fromDate, toDate } = props

  if (fromMonth) {
    fromDate = startOfMonth(fromMonth)
  } else if (fromYear) {
    fromDate = new Date(fromYear, 0, 1)
  }
  if (toMonth) {
    toDate = endOfMonth(toMonth)
  } else if (toYear) {
    toDate = new Date(toYear, 11, 31)
  }

  return {
    fromDate: fromDate ? startOfDay(fromDate) : undefined,
    toDate: toDate ? startOfDay(toDate) : undefined,
  }
}

interface CreatePassPropsContextOptions {
  name: string
}

// Use this to create Context Provider that pass props to child node.
export const createPassPropsContext = <ContextType,>(
  props: CreatePassPropsContextOptions,
) => {
  const { name } = props
  const Context = createContext<ContextType | undefined>(undefined)
  Context.displayName = name

  const usePassPropsContext = () => useContext<ContextType | undefined>(Context)

  const BasePassPropsProvider: FC<PropsWithChildren<ContextType>> = (
    props: PropsWithChildren<ContextType>,
  ) => {
    const { children, ...restProps } = props
    return (
      <Context.Provider value={restProps as any}>{children}</Context.Provider>
    )
  }
  return [
    BasePassPropsProvider,
    usePassPropsContext,
    Context,
  ] as CreatePassPropsContextReturn<ContextType>
}

type CreatePassPropsContextReturn<T> = [
  FC<PropsWithChildren<T>>,
  () => T,
  React.Context<T>,
]
