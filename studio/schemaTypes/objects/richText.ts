import { defineArrayMember, defineType } from 'sanity'

// Paragraph text with bold, italic, and links. Used for the long texts (about facets, project stories, task lines).
export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: function (rule) {
                  return rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true })
                },
              },
            ],
          },
        ],
      },
    }),
  ],
})
