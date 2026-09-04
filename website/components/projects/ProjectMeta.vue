<template>
  <p class="eyebrow project-meta">
    <b v-if="project['featured']" class="featured-mark" title="Featured project">
      <Icon name="mdi:star-four-points" aria-hidden="true" />
      <span class="sr-only">Featured</span>
    </b>
    <span>{{ project['year'] }}</span>
    <span v-for="tag in project['tags']" :key="tag">{{ tag }}</span>
  </p>
</template>

<script setup lang="ts">
import type { PROJECTS_QUERY_RESULT } from '~~/sanity.types'

// The eyebrow above a project title: featured star, year, and tags. Shared by the card and the modal.
defineProps<{
  project: PROJECTS_QUERY_RESULT[number]
}>()
</script>

<style scoped lang="scss">
.project-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.75rem;
  margin: 0;
  color: var(--ink-2);

  span + span::before {
    content: '·';
    margin-right: 0.75rem;
    color: var(--green);
  }

  .featured-mark {
    display: inline-flex;
    color: var(--green-ink);
    font-size: 0.9rem;
    line-height: 1;
  }
}
</style>
