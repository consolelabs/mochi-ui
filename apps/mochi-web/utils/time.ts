import format from 'date-fns/format'

export function formatDate(date: string, template: string = 'MMM dd, yyyy') {
  if (!date) {
    return ''
  }

  return format(new Date(date), template)
}

export function secondToDays(seconds: number) {
  return Number(seconds / (24 * 60 * 26)).toFixed(0)
}
