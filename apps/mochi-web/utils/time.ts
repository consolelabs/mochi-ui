/* eslint-disable import/no-duplicates */
import enUS from 'date-fns/locale/en-US'
import format from 'date-fns/format'
import relative from 'date-fns/formatRelative'

const formatRelativeLocale = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday at' HH:mm",
  today: "'Today at' HH:mm",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: 'dd.MM.yyyy',
}

const locale = {
  ...enUS,
  formatRelative: (token: keyof typeof formatRelativeLocale) =>
    formatRelativeLocale[token],
}

export function formatRelative(date: string) {
  return relative(new Date(date), new Date(), { locale })
}

export function formatDate(date: string, template: string = 'MMM dd, yyyy') {
  if (!date) {
    return ''
  }

  return format(new Date(date), template)
}

export function secondToDays(seconds: number) {
  return Number(seconds / (24 * 60 * 26)).toFixed(0)
}
