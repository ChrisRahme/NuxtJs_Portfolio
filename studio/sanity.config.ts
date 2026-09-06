import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { schemaTypes } from './schemaTypes'
import { DEFAULT_LOCALE, LOCALES } from './schemaTypes/constants'
import { SINGLETON_TYPES, structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Chris Rahmé',

  projectId: '1ff3j3n2',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    internationalizedArray({
      languages: LOCALES,
      defaultLanguages: [DEFAULT_LOCALE],
      fieldTypes: ['string', 'text', 'richText'],
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Singletons are opened from the sidebar, never created from the "new document" menu
    templates: function (templates) {
      return templates.filter(function (template) {
        return !SINGLETON_TYPES.includes(template.schemaType)
      })
    },
  },

  document: {
    // Singletons cannot be duplicated, deleted, or unpublished
    actions: function (actions, context) {
      if (!SINGLETON_TYPES.includes(context.schemaType)) {
        return actions
      }

      return actions.filter(function (action) {
        return !['duplicate', 'delete', 'unpublish'].includes(action.action || '')
      })
    },
  },
})
