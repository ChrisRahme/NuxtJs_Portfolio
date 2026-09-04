<template>
  <div class="project-image">
    <NuxtImg provider="sanity" :src="imageRef(image)" :alt="alt" width="640" height="360" loading="lazy" format="webp" />
  </div>
</template>

<script setup lang="ts">
import type { PROJECTS_QUERY_RESULT } from '~~/sanity.types'

type ProjectImage = NonNullable<PROJECTS_QUERY_RESULT[number]['images']>[number]

withDefaults(
  defineProps<{
    image: ProjectImage
    alt?: string
  }>(),
  { alt: '' },
)
</script>

<style scoped lang="scss">
.project-image {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--paper-2);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
