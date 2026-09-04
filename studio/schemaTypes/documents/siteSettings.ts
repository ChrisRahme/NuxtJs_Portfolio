import { defineArrayMember, defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'
import { COLOR_DESCRIPTION, HEX_COLOR } from '../constants'

// Singleton: texts that belong to a page rather than to a content item.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'site', title: 'Site' },
    { name: 'home', title: 'Home' },
    { name: 'resume', title: 'Resume' },
    { name: 'projects', title: 'Projects' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({
      name: 'site',
      title: 'Site',
      group: 'site',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Site title',
          description: 'Shown in the browser tab and in link previews.',
          type: 'string',
          validation: function (rule) {
            return rule.required()
          },
        }),
        defineField({
          name: 'description',
          title: 'Default description',
          description: 'Meta description used when a page has none.',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: 'home',
      title: 'Home page',
      group: 'home',
      type: 'object',
      fields: [
        defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 2 }),
        defineField({ name: 'heroEyebrow', title: 'Hero eyebrow', description: 'Small line above the name.', type: 'string' }),
        defineField({ name: 'heroTitle', title: 'Hero title', type: 'string' }),
        defineField({ name: 'heroLead', title: 'Hero lead', description: 'One sentence under the name.', type: 'string' }),
        defineField({
          name: 'aboutGreeting',
          title: 'About greeting',
          description: 'Short highlighted opener before every "About me" text, e.g. "Hi, I am Chris."',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'resume',
      title: 'Resume page',
      group: 'resume',
      type: 'object',
      fields: [
        defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 2 }),
        defineField({ name: 'eyebrow', title: 'Eyebrow', description: 'Small line above the name, e.g. the job title.', type: 'string' }),
        defineField({ name: 'title', title: 'Title', description: 'Usually the full name.', type: 'string' }),
        defineField({ name: 'summary', title: 'Summary', description: 'Intro paragraphs at the top of the resume.', type: 'richText' }),
        defineField({ name: 'phone', title: 'Phone', description: 'International format, e.g. +961 71 123 456', type: 'string' }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: function (rule) {
            return rule.email()
          },
        }),
        defineField({
          name: 'cv',
          title: 'CV (PDF)',
          description: 'Offered by the "Download CV" button.',
          type: 'file',
          options: { accept: 'application/pdf' },
        }),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Projects page',
      group: 'projects',
      type: 'object',
      fields: [
        defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 2 }),
        defineField({ name: 'lead', title: 'Lead', description: 'One sentence under the page title.', type: 'string' }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      group: 'footer',
      type: 'object',
      fields: [
        defineField({
          name: 'friends',
          title: 'Friends',
          description: 'Sites of friends, shown as small logos in the footer.',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'friend',
              type: 'object',
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
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: function (rule) {
                    return rule.required()
                  },
                }),
                defineField({ name: 'image', title: 'Logo', type: 'figure' }),
                defineField({
                  name: 'color',
                  title: 'Color',
                  description: COLOR_DESCRIPTION,
                  type: 'string',
                  validation: function (rule) {
                    return rule.regex(HEX_COLOR, { name: 'hex color' })
                  },
                }),
              ],
              preview: {
                select: { title: 'name', subtitle: 'url', media: 'image' },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: function () {
      return { title: 'Site settings' }
    },
  },
})
