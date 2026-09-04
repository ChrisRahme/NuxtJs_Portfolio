import type { MaybeRefOrGetter } from 'vue'

// Title, description, and the matching OpenGraph/Twitter tags for one page.
export function usePageMeta(options: { title: MaybeRefOrGetter<string>; description: MaybeRefOrGetter<string>; path: string }) {
  const config = useRuntimeConfig()

  const title = computed(function () {
    return toValue(options.title)
  })

  const description = computed(function () {
    return toValue(options.description)
  })

  const url = `${config['public']['baseUrl']}${options.path === '/' ? '' : options.path}`

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
  })
}
