import { DEFAULT_LOCALE } from '~/i18n/config'
import { strings, type Translated } from '~/i18n/messages'

function isTranslated(node: unknown): node is Translated {
  return !!node && typeof node === 'object' && typeof (node as Translated).en === 'string'
}

function resolveLeaf(path: string): Translated | undefined {
  const node = path.split('.').reduce<unknown>(function (current, part) {
    return current && typeof current === 'object' ? (current as Record<string, unknown>)[part] : undefined
  }, strings)

  return isTranslated(node) ? node : undefined
}

// Interface-string translator.
// `t('nav.home')` returns the string for the active locale, falling back to English and then to the key itself.
// `{name}` placeholders are filled from `params`.
export function useTranslation() {
  const { locale } = useLocale()

  function t(key: string, params?: Record<string, string | number | null | undefined>) {
    const leaf = resolveLeaf(key)
    const template = leaf ? (leaf[locale.value] ?? leaf[DEFAULT_LOCALE]) : key

    if (!params) {
      return template
    }

    return template.replace(/\{(\w+)\}/g, function (match, name: string) {
      if (!(name in params)) {
        return match
      }

      const value = params[name]
      return value === null || value === undefined ? '' : String(value)
    })
  }

  return { t, locale }
}
