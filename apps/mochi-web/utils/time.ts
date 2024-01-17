/* eslint-disable import/no-duplicates */
import enUS from 'date-fns/locale/en-US'
import format from 'date-fns/format'
import relative from 'date-fns/formatRelative'
import isToday from 'date-fns/isToday'
import distance from 'date-fns/formatDistanceStrict'
import diffInWeeks from 'date-fns/differenceInCalendarWeeks'
import diffInMonths from 'date-fns/differenceInCalendarMonths'
import startOfDay from 'date-fns/startOfDay'

const formatRelativeLocale = {
  lastWeek: "'1 week ago'",
  yesterday: "'a day ago'",
  today: "'Today at' HH:mm",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: (date: Date, baseDate: Date) => {
    const deltaWeeks = diffInWeeks(startOfDay(baseDate), startOfDay(date))
    const deltaMonths = diffInMonths(startOfDay(baseDate), startOfDay(date))

    if (deltaMonths === 1) {
      return "'a month ago'"
    }

    if (deltaMonths >= 2) {
      return `'${deltaMonths} months ago'`
    }

    if (deltaWeeks === 1) {
      return "'1 week ago'"
    }

    if (deltaWeeks >= 2) {
      return `'${deltaWeeks} weeks ago'`
    }

    return 'dd.MM.yyyy'
  },
}

const locale = {
  ...enUS,
  formatRelative: (
    token: keyof typeof formatRelativeLocale,
    date: Date,
    baseDate: Date,
  ) => {
    const format = formatRelativeLocale[token]

    if (typeof format === 'string') return format

    return format(date, baseDate)
  },
}

export function formatRelative(date: string) {
  return isToday(new Date(date))
    ? distance(new Date(date), new Date(), { addSuffix: true })
    : relative(new Date(date), new Date(), { locale })
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
