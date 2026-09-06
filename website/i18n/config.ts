// The languages the site offers.
// `id` matches the `_key`/`language` used by the Sanity internationalized-array items (see studio/schemaTypes/constants.ts).
export const LOCALES = [
  { id: 'en', label: 'EN', title: 'English' },
  { id: 'fr', label: 'FR', title: 'Français' },
] as const

export type Locale = (typeof LOCALES)[number]['id']

export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'fr'
}
