import { defineField, defineType } from 'sanity'
import { SparklesIcon } from '@sanity/icons/Sparkles'
import { COLOR_DESCRIPTION, HEX_COLOR, ICON_DESCRIPTION, showField } from '../constants'

// A technology or ability. Referenced by skill categories, experience tasks, and projects.
// Only skills with an icon or SVG and a color can appear in the constellation and the skills list.
export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: ICON_DESCRIPTION,
      type: 'string',
    }),
    defineField({
      name: 'svg',
      title: 'Inline SVG',
      description: 'Raw <svg> markup, used when no Iconify icon exists. Use currentColor for fills so the site can color it.',
      type: 'text',
      rows: 4,
      hidden: function ({ parent }) {
        return Boolean(parent?.icon)
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
    defineField({
      name: 'inConstellation',
      title: 'Show in the home constellation',
      description: 'Star in the hero sky. Needs a category, and an icon or SVG.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'inSkillsList',
      title: 'Show in the resume skills list',
      description: 'Also makes the star clickable in the constellation. Needs a category.',
      type: 'boolean',
      initialValue: false,
    }),
    showField,
  ],
  preview: {
    select: { title: 'name', icon: 'icon', constellation: 'inConstellation', list: 'inSkillsList', show: 'show' },
    prepare: function ({ title, icon, constellation, list, show }) {
      const where = [constellation ? 'constellation' : null, list ? 'skills list' : null].filter(Boolean).join(', ')
      return { title, subtitle: [show === false ? 'Hidden' : null, where || icon || 'Badge only'].filter(Boolean).join(' · ') }
    },
  },
})
