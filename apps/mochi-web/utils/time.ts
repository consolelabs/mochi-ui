/* eslint-disable import/no-duplicates */
import enUS from 'date-fns/locale/en-US'
import format from 'date-fns/format'
import relative from 'date-fns/formatRelative'
import isToday from 'date-fns/isToday'
import distance from 'date-fns/formatDistanceStrict'
import diffInWeeks from 'date-fns/differenceInWeeks'
import diffInMonths from 'date-fns/differenceInMonths'
import diffInDays from 'date-fns/differenceInDays'

const formatRelativeLocale = {
  lastWeek: (date: Date, baseDate: Date) => {
    const deltaDays = diffInDays(baseDate, date) + 1

    if (deltaDays < 7) return `'${deltaDays} days ago'`

    return "'1 week ago'"
  },
  yesterday: "'a day ago'",
  today: "'Today at' HH:mm",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: (date: Date, baseDate: Date) => {
    const deltaWeeks = diffInWeeks(baseDate, date) + 1
    const deltaMonths = diffInMonths(baseDate, date)

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

const formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds',
  },

  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds',
  },

  halfAMinute: 'half a minute',

  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes',
  },

  xMinutes: {
    one: 'a min',
    other: '{{count}} mins',
  },

  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours',
  },

  xHours: {
    one: '1 hour',
    other: '{{count}} hours',
  },

  xDays: {
    one: '1 day',
    other: '{{count}} days',
  },

  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks',
  },

  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks',
  },

  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months',
  },

  xMonths: {
    one: '1 month',
    other: '{{count}} months',
  },

  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years',
  },

  xYears: {
    one: '1 year',
    other: '{{count}} years',
  },

  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years',
  },

  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years',
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

const localeDistance = {
  ...enUS,
  formatDistance: (token: keyof typeof formatDistanceLocale, count: number) => {
    const format = formatDistanceLocale[token]
    if (typeof format === 'string') return `${format} ago`
    if (count === 1) return `${format.one} ago`
    return `${format.other.replace('{{count}}', count.toString())} ago`
  },
}

export function formatRelative(date: string) {
  return isToday(new Date(date))
    ? distance(new Date(date), new Date(), {
        addSuffix: true,
        locale: localeDistance,
      })
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
