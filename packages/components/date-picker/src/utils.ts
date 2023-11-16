import format from 'date-fns/format'
import { DateFormatter } from 'react-day-picker'

export const formatWeekdayName: DateFormatter = (date, options) => {
  return format(date, 'EEE', { locale: options?.locale })
}
