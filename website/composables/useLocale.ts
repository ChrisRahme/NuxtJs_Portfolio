import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from '~/i18n/config'

// The active language, persisted in the `chrisrahme_locale` cookie. A cookie (not localStorage) is
// readable during SSR, so the server renders the stored language directly — no first-paint flash and
// no hydration mismatch. Setting `locale` writes the cookie; app.vue remounts the page on a change so
// content queries re-run for the new language.
export function useLocale() {
  const cookie = useCookie<Locale>('chrisrahme_locale', {
    default: function () {
      return DEFAULT_LOCALE
    },
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
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
