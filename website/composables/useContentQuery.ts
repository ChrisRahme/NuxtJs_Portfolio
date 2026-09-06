import { hash } from 'ohash'

// Fetches a Sanity query for the active locale, passing it as the `$lang` parameter every localized query reads (see sanity/queries.ts).
export function useContentQuery<T = unknown>(query: string) {
  const { locale } = useLocale()
  const { client } = useSanity()
  const { projectId, dataset, apiVersion } = client.config()
  const version = apiVersion?.startsWith('v') ? apiVersion : `v${apiVersion || '2026-09-04'}`
  const language = locale.value

  return useAsyncData<T>(`content:${hash(query)}:${language}`, function () {
    return $fetch<{ result: T }>(`https://${projectId}.apicdn.sanity.io/${version}/data/query/${dataset}`, {
      params: { query, $lang: JSON.stringify(language) },
    }).then(function (response) {
      return response.result
    })
  })
}
