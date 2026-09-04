import { currentMonth } from '~/utils/dates'

// Shared 'YYYY-MM' for "now", used by the experience timeline and the derived facts.
export function useTodayMonth() {
    const today = useState('today-month', currentMonth)

    onMounted(function () {
        today.value = currentMonth()
    })

    return today
}
