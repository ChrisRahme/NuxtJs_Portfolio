import { defineArrayMember, defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons/Tag'
import { orderRankField, orderRankOrdering } from '../objects/orderRank'
import { COLOR_DESCRIPTION, HEX_COLOR, plural, showField } from '../constants'

// A group of skills (Back-end, Front-end, ...). The order of the categories is the order of the
// clusters in the home constellation and of the cards in the resume skills list.
export const skillCategory = defineType({
  name: 'skillCategory',
  title: 'Skill category',
  type: 'document',
  icon: TagIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'skillCategory' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'color',
      title: 'Color',
      description: COLOR_DESCRIPTION,
      type: 'string',
      validation: function (rule) {
        return rule.required().regex(HEX_COLOR, { name: 'hex color' })
      },
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      description: 'Drag to order. This is the order in the resume skills list.',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'skill' }] })],
      validation: function (rule) {
        return rule.unique()
      },
    }),
    showField,
  ],
  preview: {
    select: { title: 'title', skills: 'skills', show: 'show' },
    prepare: function ({ title, skills, show }) {
      const count = Array.isArray(skills) ? skills.length : 0
      return { title, subtitle: [show === false ? 'Hidden' : null, plural(count, 'skill')].filter(Boolean).join(' · ') }
    },
  },
})
