import type { SITE_SETTINGS_QUERY_RESULT } from '~~/sanity.types'

// The siteSettings singleton: page copy, contact details, footer friends.
// useSanityQuery dedupes by query string, so every caller shares one fetch.
export function useSiteSettings() {
  const query = useSanityQuery<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY)
  const { data: settings } = query

  const siteTitle = computed(function () {
    return settings.value?.site?.title || 'Chris Rahmé'
  })

  const siteDescription = computed(function () {
    return settings.value?.site?.description || siteTitle.value
  })

  return { settings, query, siteTitle, siteDescription }
}
