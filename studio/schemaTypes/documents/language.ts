import { defineField, defineType } from 'sanity'
import { TranslateIcon } from '@sanity/icons/Translate'
import { orderRankField, orderRankOrdering } from '../objects/orderRank'
import { ICON_DESCRIPTION, LANGUAGE_PROFICIENCIES, localizedPreview, showField } from '../constants'

function percent(name: string, title: string) {
  return defineField({
    name,
    title,
    description: '0 to 100',
    type: 'number',
    validation: function (rule) {
      return rule.required().integer().min(0).max(100)
    },
  })
}

export const language = defineType({
  name: 'language',
  title: 'Language',
  type: 'document',
  icon: TranslateIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'language' }),
    defineField({
      name: 'name',
      title: 'Language',
      type: 'internationalizedArrayString',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'flag',
      title: 'Flag icon',
      description: ICON_DESCRIPTION,
      type: 'string',
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency',
      type: 'string',
      options: { list: LANGUAGE_PROFICIENCIES },
      validation: function (rule) {
        return rule.required()
      },
    }),
    percent('reading', 'Reading'),
    percent('speaking', 'Speaking'),
    percent('writing', 'Writing'),
    percent('listening', 'Listening'),
    showField,
  ],
  preview: {
    select: { title: 'name', proficiency: 'proficiency', show: 'show' },
    prepare: function ({ title, proficiency, show }) {
      return { title: localizedPreview(title), subtitle: [show === false ? 'Hidden' : null, proficiency].filter(Boolean).join(' · ') }
    },
  },
})
