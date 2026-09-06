import { defineArrayMember, defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons/Case'
import { COLOR_DESCRIPTION, EXPERIENCE_TYPES, HEX_COLOR, localizedPreview, plural, showField } from '../constants'

// A role at a company. Sorted by start date on the site; the day of the month is ignored.
export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: CaseIcon,
  orderings: [
    {
      title: 'Start date, newest first',
      name: 'startDesc',
      by: [{ field: 'start', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'internationalizedArrayString',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: EXPERIENCE_TYPES, layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'career',
      title: 'Part of the career',
      description: 'On: counted in "years of experience" and shown on the home page track. Off for internships and side jobs.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'start',
      title: 'Start',
      description: 'Only the month is shown.',
      type: 'date',
      options: { dateFormat: 'YYYY-MM' },
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'end',
      title: 'End',
      description: 'Leave empty for a current role.',
      type: 'date',
      options: { dateFormat: 'YYYY-MM' },
      validation: function (rule) {
        return rule.min(rule.valueOfField('start'))
      },
    }),
    defineField({ name: 'logo', title: 'Company logo', type: 'figure' }),
    defineField({ name: 'link', title: 'Company website', type: 'url' }),
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
      name: 'description',
      title: 'Description',
      description: 'One or two sentences about the role.',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'tasks',
      title: 'Projects and tasks',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'task',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              description: 'Project or topic name. Optional.',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'lines',
              title: 'Lines',
              description: 'One paragraph per bullet point.',
              type: 'internationalizedArrayRichText',
              validation: function (rule) {
                return rule.required()
              },
            }),
            defineField({
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [defineArrayMember({ type: 'reference', to: [{ type: 'skill' }] })],
            }),
          ],
          preview: {
            select: { title: 'title', lines: 'lines', skills: 'skills' },
            prepare: function ({ title, lines, skills }) {
              const count = Array.isArray(skills) ? skills.length : 0
              return {
                title: localizedPreview(title) || localizedPreview(lines) || 'Task',
                subtitle: count ? plural(count, 'skill') : undefined,
              }
            },
          },
        }),
      ],
    }),
    showField,
  ],
  preview: {
    select: { title: 'title', company: 'company', start: 'start', end: 'end', media: 'logo', show: 'show' },
    prepare: function ({ title, company, start, end, media, show }) {
      const from = start ? String(start).slice(0, 7) : '?'
      const to = end ? String(end).slice(0, 7) : 'present'
      return { title: localizedPreview(title), subtitle: [show === false ? 'Hidden' : null, `${company} · ${from} – ${to}`].filter(Boolean).join(' · '), media }
    },
  },
})
