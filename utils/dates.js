const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// 'YYYY-MM' for the current month, from the local clock
export function currentMonth() {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

// Number of months since year 0, so two values can be subtracted. `null` maps to `fallback`.
export function monthIndex(value, fallback = null) {
    if (!value) {
        return fallback === null ? null : monthIndex(fallback)
    }

    const [year, month] = String(value).split('-').map(Number)
    return year * 12 + (month - 1)
}

export function yearOf(value) {
    return value ? Number(String(value).split('-')[0]) : null
}

// 'Jun 2019'; `null` gives the label for an ongoing role
export function formatMonth(value, presentLabel = 'Present') {
    if (!value) return presentLabel

    const [year, month] = String(value).split('-').map(Number)
    return `${MONTHS[month - 1]} ${year}`
}

// Whole years elapsed between two months; `end` null means the current month
export function yearsBetween(start, end = null) {
    const months = monthIndex(end, currentMonth()) - monthIndex(start)
    return Math.max(0, Math.floor(months / 12))
}

// '7 years', '1 year'
export function formatYears(count) {
    return `${count} ${count === 1 ? 'year' : 'years'}`
}
