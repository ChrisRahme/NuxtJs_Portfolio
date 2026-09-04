import { defineField } from 'sanity'

export const ORDER_RANK_FIELD = 'orderRank'

// Drag-and-drop order for @sanity/orderable-document-list.
export const orderRankOrdering = {
  title: 'Ordered',
  name: 'ordered',
  by: [{ field: ORDER_RANK_FIELD, direction: 'asc' as const }],
}

export function orderRankField(config: { type: string }) {
  return defineField({
    name: ORDER_RANK_FIELD,
    title: 'Order rank',
    type: 'string',
    hidden: true,
    readOnly: true,
    // New documents go after the last one
    initialValue: async function (_params, { getClient }) {
      const { LexoRank } = await import('lexorank')
      const last = await getClient({ apiVersion: '2026-09-04' }).fetch<string | null>(
        `*[_type == $type] | order(${ORDER_RANK_FIELD} desc)[0].${ORDER_RANK_FIELD}`,
        {
          type: config.type,
        },
      )

      let base = LexoRank.min()
      if (last) {
        try {
          base = LexoRank.parse(last)
        } catch {
          base = LexoRank.min()
        }
      }

      return base.genNext().genNext().toString()
    },
  })
}
