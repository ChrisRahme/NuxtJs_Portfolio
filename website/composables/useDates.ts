import { formatMonth as formatMonthAt, formatYears as formatYearsAt } from '~/utils/dates'

// Date formatting bound to the active locale.
export function useDates() {
  const { locale } = useLocale()

  function formatMonth(value: string | null | undefined, presentLabel?: string) {
    return formatMonthAt(value, locale.value, presentLabel)
  }

  function formatYears(count: number) {
    return formatYearsAt(count, locale.value)
  }

  return { formatMonth, formatYears }
}
