import { DEFAULT_LOCALE, type Locale } from '~/i18n/config'

const MONTHS: Record<Locale, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fr: ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juill.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
}

const YEAR_WORD: Record<Locale, { one: string; many: string }> = {
  en: { one: 'year', many: 'years' },
  fr: { one: 'an', many: 'ans' },
}

const PRESENT: Record<Locale, string> = {
  en: 'Present',
  fr: 'Présent',
}

type MonthValue = string | null | undefined

function parts(value: string) {
  const [year, month] = value.split('-').map(Number)
  return { year: year || 0, month: month || 1 }
}

// 'YYYY-MM' for the current month, from the local clock
export function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

// Number of months since year 0, so two values can be subtracted. An empty value maps to `fallback`.
export function monthIndex(value: MonthValue, fallback: MonthValue = null): number {
  if (!value) {
    return fallback ? monthIndex(fallback) : 0
  }

  const { year, month } = parts(String(value))
  return year * 12 + (month - 1)
}

export function yearOf(value: MonthValue): number | null {
  return value ? parts(String(value)).year : null
}

// 'Jun 2019'; an empty value gives the label for an ongoing role
export function formatMonth(value: MonthValue, locale: Locale = DEFAULT_LOCALE, presentLabel?: string) {
  if (!value) {
    return presentLabel ?? PRESENT[locale]
  }

  const { year, month } = parts(String(value))
  return `${MONTHS[locale][month - 1]} ${year}`
}

// Whole years elapsed between two months; an empty `end` means the current month
export function yearsBetween(start: MonthValue, end: MonthValue = null) {
  const months = monthIndex(end, currentMonth()) - monthIndex(start)
  return Math.max(0, Math.floor(months / 12))
}

// '7 years' / '7 ans', '1 year' / '1 an'
export function formatYears(count: number, locale: Locale = DEFAULT_LOCALE) {
  const word = YEAR_WORD[locale]
  return `${count} ${count === 1 ? word.one : word.many}`
}
