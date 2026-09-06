import { defineField } from 'sanity'

// Shared descriptions, option lists, and fields for the schema files.

// Languages offered by the site (see website/i18n)
export const LOCALES = [
  { id: 'en', title: 'English' },
  { id: 'fr', title: 'French' },
]

export const DEFAULT_LOCALE = 'en'

export const ICON_DESCRIPTION = 'Iconify icon name, e.g. "mdi:github". Browse icons at https://icones.js.org'

export const COLOR_DESCRIPTION = 'Hex color, e.g. #21ADB2'

export const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

export const EXPERIENCE_TYPES = ['Full-time', 'Part-time', 'Internship', 'Freelance', 'Contract']

export const LANGUAGE_PROFICIENCIES = ['Native', 'Full professional', 'Professional working', 'Limited working', 'Elementary']

// Every content type has this toggle; the website queries filter on `show != false`
export const showField = defineField({
  name: 'show',
  title: 'Show on the site',
  type: 'boolean',
  initialValue: true,
})

export function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? '' : 's'}`
}

// Localized fields are internationalized arrays: [{ _key: 'en', value }, ...].
// Studio previews show one language, so pick the default-locale value (or the first one).
// Handles plain `string` too, so previews keep working before the content is migrated.
export function localizedPreview(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value
  }

  if (!Array.isArray(value)) {
    return undefined
  }

  const items = value as Array<{ _key?: string; value?: unknown }>
  const chosen =
    items.find(function (entry) {
      return entry._key === DEFAULT_LOCALE
    }) || items[0]
  const inner = chosen?.value

  if (typeof inner === 'string') {
    return inner
  }

  if (Array.isArray(inner)) {
    const block = inner.find(function (node) {
      return (node as { _type?: string })?._type === 'block'
    }) as { children?: Array<{ text?: string }> } | undefined

    const text = block?.children
      ?.map(function (child) {
        return child.text || ''
      })
      .join('')

    return text || undefined
  }

  return undefined
}
