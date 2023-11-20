import { format, isAfter, isBefore, isEqual, isValid, parse } from 'date-fns'
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'
import { parseFromToProps } from './utils'
import {
  UseCleanSelectRangeProps,
  UseDayRangeInputProps,
  UseDayRangeInputReturn,
} from './type'

// TODO: implement case user passed in from - to month
// use utils/ParseFromToProps to get range bound
export const useCleanSelectRange = (props: UseCleanSelectRangeProps) => {
  const {
    selectedRange,
    fromDate,
    toDate,
    fromMonth,
    toMonth,
    fromYear,
    toYear,
  } = props

  const { fromDate: parsedFromDate, toDate: parsedToDate } = useMemo(
    () =>
      parseFromToProps({
        fromDate,
        toDate,
        fromMonth,
        toMonth,
        fromYear,
        toYear,
      }),
    [fromDate, fromMonth, fromYear, toDate, toMonth, toYear],
  )

  const { isSelectedFromAllowed, isSelectedToAllowed, isValidRange } =
    useMemo(() => {
      // Check selectedRange is coorect form (from < to) and in allowed range.
      let isSelectedFromAllowed = false
      let isSelectedToAllowed = false
      let isValidRange = false
      if (
        selectedRange.from &&
        (!parsedToDate || !isAfter(selectedRange.from, parsedToDate)) &&
        (!parsedFromDate || !isBefore(selectedRange.from, parsedFromDate))
      ) {
        isSelectedFromAllowed = true
      } else {
        isSelectedFromAllowed = false
      }

      if (
        selectedRange.to &&
        (!parsedToDate || !isAfter(selectedRange.to, parsedToDate)) &&
        (!parsedFromDate || !isBefore(selectedRange.to, parsedFromDate))
      ) {
        isSelectedToAllowed = true
      } else {
        isSelectedToAllowed = false
      }

      if (
        selectedRange.from &&
        selectedRange.to &&
        !isAfter(selectedRange.from as Date, selectedRange.to as Date)
      ) {
        isValidRange = true
      } else {
        isValidRange = false
      }

      return {
        isSelectedFromAllowed,
        isSelectedToAllowed,
        isValidRange,
      }
    }, [parsedFromDate, parsedToDate, selectedRange.from, selectedRange.to])

  // clean range will be display in picker
  const cleanedRange: DateRange = useMemo(() => {
    const cleanRange: DateRange = {
      from: undefined,
      to: undefined,
    }
    if (isSelectedFromAllowed) {
      cleanRange.from = selectedRange.from
    }

    if (isSelectedToAllowed) {
      cleanRange.to = selectedRange.to
    }

    if (isSelectedToAllowed && isSelectedToAllowed && !isValidRange) {
      return {
        from: undefined,
        to: undefined,
      } as DateRange
    }
    return cleanRange
  }, [
    isSelectedFromAllowed,
    isSelectedToAllowed,
    isValidRange,
    selectedRange.from,
    selectedRange.to,
  ])

  return {
    cleanedRange,
    isSelectedFromAllowed,
    isSelectedToAllowed,
    isValidRange,
    fromDate: parsedFromDate,
    toDate: parsedToDate,
  }
}

const emptyRange = {
  from: undefined,
  to: undefined,
}

export const useDayRangeInput = (
  props: UseDayRangeInputProps,
): UseDayRangeInputReturn => {
  const {
    dayTextFormat,
    onRangeChanged,
    selectedRange,
    locale,
    today,
    ...fromToProps
  } = props

  const [fromInputValue, setFromInputValue] = useState<string>('')
  const [toInputValue, setToInputValue] = useState<string>('')
  const {
    cleanedRange,
    isValidRange,
    fromDate,
    toDate,
    isSelectedFromAllowed,
    isSelectedToAllowed,
  } = useCleanSelectRange({
    selectedRange,
    ...fromToProps,
  })
  const [month, setMonth] = useState(today ?? fromDate ?? toDate ?? new Date())

  const handleFromInputChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        setFromInputValue(e.target.value)
        const date = parse(e.target.value, dayTextFormat, new Date(), {
          locale,
        })

        if (!isValid(date)) {
          return onRangeChanged({ from: undefined, to: selectedRange?.to })
        }
        onRangeChanged({ from: date, to: selectedRange?.to })
        setMonth(date)
      },
      [dayTextFormat, locale, onRangeChanged, selectedRange?.to],
    )

  const handleToInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setToInputValue(e.target.value)
      const date = parse(e.target.value, dayTextFormat, new Date())

      if (!isValid(date)) {
        return onRangeChanged({ from: selectedRange?.from, to: undefined })
      }
      onRangeChanged({ from: selectedRange?.from, to: date })
      setMonth(date)
    },
    [selectedRange?.from, onRangeChanged, dayTextFormat],
  )

  const handleRangeSelect: SelectRangeEventHandler = useCallback(
    (range: DateRange | undefined) => {
      onRangeChanged(range || emptyRange)
      if (range?.from) {
        setFromInputValue(format(range.from, dayTextFormat, { locale }))
      } else {
        setFromInputValue('')
      }
      if (range?.to) {
        setToInputValue(format(range.to, dayTextFormat, { locale }))
      } else {
        setToInputValue('')
      }
    },
    [onRangeChanged, dayTextFormat, locale],
  )

  useEffect(() => {
    // Bind selected range
    const { from, to } = selectedRange
    const fromInputDate = parse(fromInputValue, dayTextFormat, new Date())
    const toInputDate = parse(toInputValue, dayTextFormat, new Date())

    if (
      isValid(fromInputDate) &&
      from !== undefined &&
      !isEqual(from, fromInputDate)
    ) {
      setFromInputValue(format(from, dayTextFormat, { locale }))
      setMonth(from)
    }
    if (isValid(toInputDate) && to !== undefined && !isEqual(to, toInputDate)) {
      setToInputValue(format(to, dayTextFormat, { locale }))
      setMonth(to)
    }
  }, [fromInputValue, selectedRange, dayTextFormat, toInputValue, locale])

  return {
    fromInputProps: {
      value: fromInputValue,
      onChange: handleFromInputChange,
    },
    toInputProps: {
      value: toInputValue,
      onChange: handleToInputChange,
    },
    dayPickerProps: {
      mode: 'range' as 'range',
      onSelect: handleRangeSelect,
      month,
      onMonthChange: setMonth,
      selected: cleanedRange,
      locale,
      fromDate,
      toDate,
      today,
    },
    setMonth,
    inputState: {
      isValid: isValidRange && isSelectedFromAllowed && isSelectedToAllowed,
      isFromDateValid:
        isSelectedFromAllowed && (!selectedRange.to || isValidRange),
      isToDateValid:
        isSelectedToAllowed && (!selectedRange.from || isValidRange),
    },
  }
}
