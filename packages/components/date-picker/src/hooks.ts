import { format, isBefore, isEqual, isValid, parse } from 'date-fns'
import { ChangeEventHandler, useLayoutEffect, useMemo, useState } from 'react'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'

export const useCleanSelectRange = (selectedRange: DateRange) => {
  const [isValidRange, setIsValidRange] = useState(false)

  useLayoutEffect(() => {
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

  const validRange: DateRange = useMemo(() => {
    let selected: DateRange
    if (
      (selectedRange?.from && !selectedRange?.to) ||
      (selectedRange?.to && !selectedRange?.from)
    ) {
      selected = selectedRange
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
    cleanedRange: validRange,
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

  const handleFromInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFromInputValue(e.target.value)
    const date = parse(e.target.value, textFormat, new Date())

    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: selectedRange?.to })
    }
    setSelectedRange({ from: date, to: selectedRange?.to })
    setMonth(date)
  }

  const handleToInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setToInputValue(e.target.value)
    const date = parse(e.target.value, textFormat, new Date())

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined })
    }
    setSelectedRange({ from: selectedRange?.from, to: date })
    setMonth(date)
  }

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
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
  }

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
