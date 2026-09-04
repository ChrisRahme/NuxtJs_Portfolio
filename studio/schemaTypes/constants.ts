import { defineField } from 'sanity'

// Shared descriptions, option lists, and fields for the schema files.

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
