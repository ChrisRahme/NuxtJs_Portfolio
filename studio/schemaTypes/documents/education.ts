import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons/Book'
import { COLOR_DESCRIPTION, HEX_COLOR, ICON_DESCRIPTION, localizedPreview, showField } from '../constants'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: BookIcon,
  orderings: [
    {
      title: 'Start year, newest first',
      name: 'startDesc',
      by: [{ field: 'start', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Degree',
      type: 'internationalizedArrayString',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'start',
      title: 'Start year',
      type: 'number',
      validation: function (rule) {
        return rule.required().integer().min(1900)
      },
    }),
    defineField({
      name: 'end',
      title: 'End year',
      type: 'number',
      validation: function (rule) {
        return rule.required().integer().min(rule.valueOfField('start'))
      },
    }),
    defineField({ name: 'logo', title: 'Logo', type: 'figure' }),
    defineField({ name: 'link', title: 'Website', type: 'url' }),
    defineField({
      name: 'color',
      title: 'Color',
      description: COLOR_DESCRIPTION,
      type: 'string',
      validation: function (rule) {
        return rule.regex(HEX_COLOR, { name: 'hex color' })
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: ICON_DESCRIPTION,
      type: 'string',
    }),
    showField,
  ],
  preview: {
    select: { title: 'title', institution: 'institution', start: 'start', end: 'end', media: 'logo', show: 'show' },
    prepare: function ({ title, institution, start, end, media, show }) {
      return {
        title: localizedPreview(title),
        subtitle: [show === false ? 'Hidden' : null, `${institution} · ${start} – ${end}`].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
