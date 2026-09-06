import { defineArrayMember, defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons/Rocket'
import { orderRankField, orderRankOrdering } from '../objects/orderRank'
import { ICON_DESCRIPTION, localizedPreview, showField } from '../constants'

// A side project. The site sorts by year (newest first), then by the drag order in the Studio.
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: RocketIcon,
  orderings: [orderRankOrdering],
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Details' },
  ],
  fields: [
    orderRankField({ type: 'project' }),
    defineField({
      name: 'name',
      title: 'Name',
      group: 'content',
      type: 'internationalizedArrayString',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used in the ?project= link from the home page. Generated from the English name; keep it stable so links keep working.',
      group: 'meta',
      type: 'slug',
      options: {
        // Name is localized, so read the English value for the slug source.
        source: function (doc) {
          const name = (doc as { name?: unknown }).name
          if (Array.isArray(name)) {
            const entry = name.find(function (item: { _key?: string; language?: string }) {
              return item?._key === 'en' || item?.language === 'en'
            }) as { value?: string } | undefined
            return entry?.value || ''
          }

          return typeof name === 'string' ? name : ''
        },
      },
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'One line shown on the card.',
      group: 'content',
      type: 'internationalizedArrayString',
      validation: function (rule) {
        return rule.required()
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'First paragraph is the story; the paragraphs after it are shown as smaller notes.',
      group: 'content',
      type: 'internationalizedArrayRichText',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      description: 'The first image is the card preview.',
      group: 'content',
      type: 'array',
      of: [defineArrayMember({ type: 'figure' })],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      group: 'meta',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'link',
          type: 'object',
          fields: [
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
              initialValue: 'mdi:web',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              description: 'Optional. Defaults to "Source" for GitHub, "Video" for YouTube, "Open" otherwise.',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'url', icon: 'icon' },
            prepare: function ({ title, subtitle, icon }) {
              return { title: title || icon || 'Link', subtitle }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Built with',
      group: 'meta',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'skill' }] })],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Short topics, e.g. AI, IoT, Music.',
      group: 'meta',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      group: 'meta',
      type: 'number',
      validation: function (rule) {
        return rule.required().integer().min(2000)
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Shown on the home page and in the "Featured" view of the projects page.',
      group: 'meta',
      type: 'boolean',
      initialValue: false,
    }),
    showField,
  ],
  preview: {
    select: { title: 'name', year: 'year', featured: 'featured', media: 'images.0', show: 'show' },
    prepare: function ({ title, year, featured, media, show }) {
      return {
        title: localizedPreview(title),
        subtitle: [show === false ? 'Hidden' : null, year, featured ? 'Featured' : null].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
