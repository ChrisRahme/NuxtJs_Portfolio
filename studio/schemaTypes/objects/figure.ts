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
    defineField({
      name: 'video',
      title: 'Video clip',
      description:
        'Optional. A short silent clip (MP4) that plays in place of this image in the project viewer. Give it the same size as the image: the image stays the card preview and the poster.',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      // Only project screenshots play a clip
      hidden: function ({ document }) {
        return document?._type !== 'project'
      },
    }),
  ],
})
