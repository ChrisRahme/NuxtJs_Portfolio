import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons/Link'
import { orderRankField, orderRankOrdering } from '../objects/orderRank'
import { COLOR_DESCRIPTION, HEX_COLOR, ICON_DESCRIPTION, showField } from '../constants'

// Profile links in the footer.
export const social = defineType({
  name: 'social',
  title: 'Social link',
  type: 'document',
  icon: LinkIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'social' }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: ICON_DESCRIPTION,
      type: 'string',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'color',
      title: 'Brand color',
      description: COLOR_DESCRIPTION,
      type: 'string',
      validation: function (rule) {
        return rule.regex(HEX_COLOR, { name: 'hex color' })
      },
    }),
    showField,
  ],
  preview: {
    select: { title: 'name', subtitle: 'url', show: 'show' },
    prepare: function ({ title, subtitle, show }) {
      return { title: show === false ? `${title} (hidden)` : title, subtitle }
    },
  },
})
