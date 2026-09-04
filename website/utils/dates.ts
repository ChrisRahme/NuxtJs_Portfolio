const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Sanity dates are 'YYYY-MM-DD'; only the year and month matter here. 'YYYY-MM' is accepted too.
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
export function formatMonth(value: MonthValue, presentLabel = 'Present') {
  if (!value) {
    return presentLabel
  }

  const { year, month } = parts(String(value))
  return `${MONTHS[month - 1]} ${year}`
}

// Whole years elapsed between two months; an empty `end` means the current month
export function yearsBetween(start: MonthValue, end: MonthValue = null) {
  const months = monthIndex(end, currentMonth()) - monthIndex(start)
  return Math.max(0, Math.floor(months / 12))
}

// '7 years', '1 year'
export function formatYears(count: number) {
  return `${count} ${count === 1 ? 'year' : 'years'}`
}
