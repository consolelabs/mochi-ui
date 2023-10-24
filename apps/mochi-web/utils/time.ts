import format from 'date-fns/format'

type DateFormat = 'MMM dd, yyyy'

export function formatDate(
  date: string,
  template: DateFormat = 'MMM dd, yyyy',
) {
  if (!date) {
    return ''
  }

  return format(new Date(date), template)
}

export function secondToDays(seconds: number) {
  return Number(seconds / (24 * 60 * 26)).toFixed(0)
}
