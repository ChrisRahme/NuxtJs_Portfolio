import { defineField, defineType } from 'sanity'
import { BlockquoteIcon } from '@sanity/icons/Blockquote'
import { localizedPreview, showField } from '../constants'

// One-liners shown at random under the hero.
export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'document',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'internationalizedArrayString',
      validation: function (rule) {
        return rule.required()
      },
    }),
    showField,
  ],
  preview: {
    select: { title: 'text', show: 'show' },
    prepare: function ({ title, show }) {
      return { title: localizedPreview(title), subtitle: show === false ? 'Hidden' : undefined }
    },
  },
})
