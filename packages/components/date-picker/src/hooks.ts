import { format, isBefore, isEqual, isValid, parse } from 'date-fns'
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'

// TODO: implement case user passed in from - to month
// use utils/ParseFromToProps to get range bound
export const useCleanSelectRange = (selectedRange: DateRange) => {
  const [isValidRange, setIsValidRange] = useState(false)

  useLayoutEffect(() => {
    // Check if current range correct (from < to)
    if (
      selectedRange?.from &&
      selectedRange?.to &&
      (isEqual(selectedRange.from, selectedRange.to) ||
        isBefore(selectedRange.from, selectedRange.to))
    ) {
      setIsValidRange(true)
    } else {
      setIsValidRange(false)
    }
  }, [selectedRange?.from, selectedRange?.to])

  // clean invalid range to display in picker
  const cleanedRange: DateRange = useMemo(() => {
    let selected: DateRange
    if (
      (selectedRange?.from && !selectedRange?.to) ||
      (selectedRange?.to && !selectedRange?.from)
    ) {
      selected = selectedRange
      return selected
    }
    if (selectedRange?.from && selectedRange.to && !isValidRange) {
      selected = {
        from: undefined,
        to: undefined,
      }
    } else {
      selected = selectedRange
    }
    return selected
  }, [isValidRange, selectedRange])
  return {
    cleanedRange,
    isValidRange,
  }
}

const emptyRange = {
  from: undefined,
  to: undefined,
}

export const useDayRangeInput = (
  selectedRange: DateRange,
  textFormat: string,
  setSelectedRange: (_: DateRange) => void,
) => {
  const [fromInputValue, setFromInputValue] = useState<string>('')
  const [toInputValue, setToInputValue] = useState<string>('')
  const [month, setMonth] = useState(new Date())
  const { cleanedRange, isValidRange } = useCleanSelectRange(selectedRange)

  const handleFromInputChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        setFromInputValue(e.target.value)
        const date = parse(e.target.value, textFormat, new Date())

        if (!isValid(date)) {
          return setSelectedRange({ from: undefined, to: selectedRange?.to })
        }
        setSelectedRange({ from: date, to: selectedRange?.to })
        setMonth(date)
      },
      [selectedRange?.to, setSelectedRange, textFormat],
    )

  const handleToInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setToInputValue(e.target.value)
      const date = parse(e.target.value, textFormat, new Date())

      if (!isValid(date)) {
        return setSelectedRange({ from: selectedRange?.from, to: undefined })
      }
      setSelectedRange({ from: selectedRange?.from, to: date })
      setMonth(date)
    },
    [selectedRange?.from, setSelectedRange, textFormat],
  )

  const handleRangeSelect: SelectRangeEventHandler = useCallback(
    (range: DateRange | undefined) => {
      setSelectedRange(range || emptyRange)
      if (range?.from) {
        setFromInputValue(format(range.from, textFormat))
      } else {
        setFromInputValue('')
      }
      if (range?.to) {
        setToInputValue(format(range.to, textFormat))
      } else {
        setToInputValue('')
      }
    },
    [setSelectedRange, textFormat],
  )

  useEffect(() => {
    // Bind selected range
    const { from, to } = selectedRange
    const fromInputDate = parse(fromInputValue, textFormat, new Date())
    const toInputDate = parse(toInputValue, textFormat, new Date())

    if (
      isValid(fromInputDate) &&
      from !== undefined &&
      !isEqual(from, fromInputDate)
    ) {
      setFromInputValue(format(from, textFormat))
      setMonth(from)
    }
    if (isValid(toInputDate) && to !== undefined && !isEqual(to, toInputDate)) {
      setToInputValue(format(to, textFormat))
      setMonth(to)
    }
  }, [fromInputValue, selectedRange, textFormat, toInputValue])

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
    },
    setMonth,
    isValidRange,
  }
}
