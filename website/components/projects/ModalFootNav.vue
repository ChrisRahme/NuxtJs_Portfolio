<template>
  <nav class="modal-foot" aria-label="Older and newer projects">
    <button type="button" class="foot-btn foot-older" :disabled="!older" @click="pick(older)">
      <span class="eyebrow foot-dir">
        <Icon :name="olderSide['icon']" aria-hidden="true" />
        <span>{{ olderSide['label'] }}</span>
      </span>
      <span class="foot-name">{{ older ? older['name'] : '' }}</span>
    </button>

    <button type="button" class="foot-btn foot-newer" :disabled="!newer" @click="pick(newer)">
      <span class="eyebrow foot-dir">
        <span>{{ newerSide['label'] }}</span>
        <Icon :name="newerSide['icon']" aria-hidden="true" />
      </span>
      <span class="foot-name">{{ newer ? newer['name'] : '' }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import type { PROJECTS_QUERY_RESULT } from '~~/sanity.types'

type Project = PROJECTS_QUERY_RESULT[number]

// Props
const props = defineProps<{
  older: Project | null
  newer: Project | null
  olderWraps: boolean
  newerWraps: boolean
}>()

// Emits
const emit = defineEmits<{
  select: [project: Project]
}>()

// Navigation wraps around, so at a seam the button reads "Newest"/"Oldest" with a loop icon
const olderSide = computed(function () {
  return props['olderWraps'] ? { label: 'Newest', icon: 'mdi:autorenew' } : { label: 'Older', icon: 'mdi:arrow-left' }
})

const newerSide = computed(function () {
  return props['newerWraps'] ? { label: 'Oldest', icon: 'mdi:autorenew' } : { label: 'Newer', icon: 'mdi:arrow-right' }
})

// Methods
function pick(project: Project | null) {
  if (project) {
    emit('select', project)
  }
}
</script>

<style scoped lang="scss">
.modal-foot {
  display: grid;
  flex: none;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--line);
  background: var(--paper);
}

.foot-btn {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  margin: 0;
  padding: 0.85rem 1.25rem 0.95rem;
  border: 0;
  background: none;
  font: inherit;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  transition:
    background-color 200ms ease,
    color 200ms ease;

  &.foot-newer {
    align-items: flex-end;
    text-align: right;
    border-left: 1px solid var(--line);
  }

  .foot-dir {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--ink-2);
    transition: color 200ms ease;

    .iconify {
      font-size: 0.9rem;
    }
  }

  .foot-name {
    max-width: 100%;
    overflow: hidden;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.3;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover:not(:disabled) {
    background: var(--paper-2);

    .foot-dir,
    .foot-name {
      color: var(--green-ink);
    }
  }

  &:disabled {
    color: var(--ink-2);
    opacity: 0.55;
    cursor: default;

    .foot-name {
      font-weight: 500;
    }
  }

  &:focus-visible {
    outline-offset: -4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .foot-btn,
  .foot-btn .foot-dir {
    transition: none;
  }
}
</style>
