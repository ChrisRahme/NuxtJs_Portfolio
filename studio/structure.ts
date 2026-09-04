import type { ItemChild, ListItemBuilder, StructureBuilder, StructureResolver, StructureResolverContext } from 'sanity/structure'
import type { ComponentType } from 'react'
import { CogIcon } from '@sanity/icons/Cog'
import { UserIcon } from '@sanity/icons/User'
import { TagIcon } from '@sanity/icons/Tag'
import { TranslateIcon } from '@sanity/icons/Translate'
import { RocketIcon } from '@sanity/icons/Rocket'
import { LinkIcon } from '@sanity/icons/Link'

export const SINGLETON_TYPES = ['siteSettings']

// Drag-and-drop list from @sanity/orderable-document-list. The plugin is loaded when the item is
// opened, not at module load: it depends on the CommonJS `lexorank`, which breaks `sanity schemas extract`
// (see schemaTypes/objects/orderRank.ts).
function orderableItem(S: StructureBuilder, context: StructureResolverContext, config: { type: string; title: string; icon: ComponentType }): ListItemBuilder {
  return S.listItem()
    .title(config.title)
    .id(`orderable-${config.type}`)
    .icon(config.icon)
    .schemaType(config.type)
    .child(async function () {
      const { orderableDocumentListDeskItem } = await import('@sanity/orderable-document-list')
      // The plugin returns a serialized list item whose child is a component node
      return orderableDocumentListDeskItem({ ...config, S, context }).child as ItemChild
    })
}

// Sidebar: the singleton first, then one entry per content type.
export const structure: StructureResolver = function (S, context) {
  return S.list()
    .title('Content')
    .items([
      S.listItem().title('Site settings').id('siteSettings').icon(CogIcon).child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      orderableItem(S, context, { type: 'about', title: 'About me', icon: UserIcon }),
      S.documentTypeListItem('experience').title('Experience'),
      S.documentTypeListItem('education').title('Education'),
      orderableItem(S, context, { type: 'language', title: 'Languages', icon: TranslateIcon }),
      S.divider(),
      orderableItem(S, context, { type: 'skillCategory', title: 'Skill categories', icon: TagIcon }),
      S.documentTypeListItem('skill').title('Skills'),
      S.divider(),
      orderableItem(S, context, { type: 'project', title: 'Projects', icon: RocketIcon }),
      S.divider(),
      S.documentTypeListItem('quote').title('Quotes'),
      orderableItem(S, context, { type: 'social', title: 'Social links', icon: LinkIcon }),
    ])
}
