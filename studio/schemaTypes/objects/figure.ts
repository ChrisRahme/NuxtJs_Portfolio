import { defineField, defineType } from 'sanity'

// Image with alternative text. Every picture on the site uses this type.
export const figure = defineType({
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      description: 'Read by screen readers and shown when the image does not load.',
      type: 'string',
    }),
  ],
})
