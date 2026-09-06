import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons/User'
import { orderRankField, orderRankOrdering } from '../objects/orderRank'
import { localizedPreview, showField } from '../constants'

// One facet of the "About me" section on the home page (Programmer, Astronomer, ...).
export const about = defineType({
  name: 'about',
  title: 'About me',
  type: 'document',
  icon: UserIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'about' }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Label of the tab, e.g. "Programmer".',
      type: 'internationalizedArrayString',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      description: 'Shown before the title in the tab.',
      type: 'string',
      validation: function (rule) {
        return rule.max(8)
      },
    }),
    defineField({
      name: 'text',
      title: 'Text',
      description: 'The greeting from Site settings is added before the first paragraph.',
      type: 'internationalizedArrayRichText',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({ name: 'image', title: 'Photo', type: 'figure' }),
    defineField({
      name: 'caption',
      title: 'Photo caption',
      description: 'Handwritten line under the photo.',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      description: 'Optional call to action under the text.',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Text', type: 'internationalizedArrayString' }),
        defineField({ name: 'link', title: 'Link', description: 'Site path (e.g. /resume) or full URL.', type: 'string' }),
      ],
    }),
    showField,
  ],
  preview: {
    select: { title: 'title', emoji: 'emoji', media: 'image', show: 'show' },
    prepare: function ({ title, emoji, media, show }) {
      return {
        title: [emoji, localizedPreview(title)].filter(Boolean).join(' '),
        subtitle: show === false ? 'Hidden' : undefined,
        media,
      }
    },
  },
})
