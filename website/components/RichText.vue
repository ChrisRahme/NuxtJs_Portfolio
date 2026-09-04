<template>
  <PortableText :value="value || []" :components="components" />
</template>

<script setup lang="ts">
import { Fragment, h, type FunctionalComponent } from 'vue'
import { PortableText, type PortableTextComponentProps, type PortableTextComponents, type PortableTextMarkComponentProps } from '@portabletext/vue'
import type { PortableTextBlock, TypedObject } from '@portabletext/types'

// Renders the `richText` blocks from Sanity. `inline` drops the <p> wrappers, so a single block
// can sit inside an existing element (a list item, a span after a greeting, ...).
const props = defineProps<{
  value: TypedObject[] | null | undefined
  inline?: boolean
}>()

const InlineBlock: FunctionalComponent<PortableTextComponentProps<PortableTextBlock>> = function (_, { slots }) {
  return h(Fragment, slots.default ? slots.default() : [])
}

const LinkMark: FunctionalComponent<PortableTextMarkComponentProps<{ _type: 'link'; href?: string }>> = function (markProps, { slots }) {
  const href = markProps.value?.href || ''
  const external = /^https?:/.test(href)
  return h('a', { href, target: external ? '_blank' : undefined, rel: external ? 'noopener noreferrer' : undefined }, slots.default ? slots.default() : [])
}

const components = computed<PortableTextComponents>(function () {
  return {
    block: props.inline ? { normal: InlineBlock } : {},
    marks: { link: LinkMark },
  }
})
</script>
