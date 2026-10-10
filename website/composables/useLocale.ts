import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from '~/i18n/config'

export function useLocale() {
  const cookie = useCookie<Locale>('chrisrahme_locale', {
    default: function () {
      return DEFAULT_LOCALE
    },
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
    secure: !import.meta.dev,
  })

  const locale = computed<Locale>({
    get: function () {
      return isLocale(cookie.value) ? cookie.value : DEFAULT_LOCALE
    },
    set: function (value) {
      if (isLocale(value)) {
        cookie.value = value
      }
    },
  })

  function setLocale(next: Locale) {
    locale.value = next
  }

  function toggle() {
    setLocale(locale.value === 'en' ? 'fr' : 'en')
  }

  return { locale, locales: LOCALES, setLocale, toggle }
}
