<template>
  <div v-if="state['timeline'].length" ref="timelineEl" class="timeline">
    <ExperienceTrack :items="state['timeline']" :selected-index="state['selectedIndex']" :today="today" @select="selectItem" />

    <div class="pager">
      <button
        type="button"
        class="btn-ghost btn-icon"
        :disabled="state['selectedIndex'] <= 0"
        :aria-label="t('resume.previousRole')"
        @click="selectItem(state['selectedIndex'] - 1)"
      >
        <Icon name="ph:caret-left" />
      </button>

      <p v-if="state['selectedItem']" class="pager-label">
        <span class="pager-count">{{ state['selectedIndex'] + 1 }} / {{ state['timeline'].length }}</span>
        <span class="pager-dates"><ExperienceDates :item="state['selectedItem']" /></span>
      </p>

      <button
        type="button"
        class="btn-ghost btn-icon"
        :disabled="state['selectedIndex'] >= state['timeline'].length - 1"
        :aria-label="t('resume.nextRole')"
        @click="selectItem(state['selectedIndex'] + 1)"
      >
        <Icon name="ph:caret-right" />
      </button>
    </div>

    <Transition name="swap" mode="out-in">
      <ExperienceCard v-if="state['selectedItem']" :key="state['selectedIndex']" :item="state['selectedItem']" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { EXPERIENCE_QUERY_RESULT } from '~~/sanity.types'
import ExperienceCard from './ExperienceCard.vue'
import ExperienceDates from './ExperienceDates.vue'
import ExperienceTrack from './ExperienceTrack.vue'
import { slugify } from '~/utils/text'

const { t } = useTranslation()

type Role = EXPERIENCE_QUERY_RESULT[number]

// Oldest first, as ordered by the query
const { data } = await useContentQuery<EXPERIENCE_QUERY_RESULT>(EXPERIENCE_QUERY)
const experience: Role[] = data.value || []

const today = useTodayMonth()

// `?role=<company slug>` (from the home page track) preselects a role; the current one is the default
const route = useRoute()
const lastIndex = experience.length - 1
const requestedIndex = experience.findIndex(function (item) {
  return slugify(item['company']) === route.query['role']
})
const initialIndex = requestedIndex >= 0 ? requestedIndex : lastIndex

const timelineEl = ref<HTMLElement | null>(null)

// State
const state = reactive<{ timeline: Role[]; selectedIndex: number; selectedItem: Role | null }>({
  timeline: experience,
  selectedIndex: initialIndex,
  selectedItem: experience[initialIndex] || null,
})

// Methods
function selectItem(index: number) {
  state['selectedIndex'] = Math.max(0, Math.min(index, lastIndex))
  state['selectedItem'] = state['timeline'][state['selectedIndex']] || null
}

function isTypingTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'))
}

// A key press that another handler, a modifier shortcut, or a form field already owns
function isClaimed(event: KeyboardEvent) {
  return event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || isTypingTarget(event.target)
}

// Plain arrow keys step through the roles
const ARROW_STEPS: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
}

function onPageKeydown(event: KeyboardEvent) {
  const step = ARROW_STEPS[event.key]
  if (!step || isClaimed(event)) {
    return
  }

  const next = state['selectedIndex'] + step
  if (next < 0 || next > lastIndex) {
    return
  }

  event.preventDefault()
  selectItem(next)
  revealTimeline()
}

function revealTimeline() {
  const element = timelineEl.value
  if (!element) {
    return
  }

  const header = document.getElementById('header')
  const top = element.getBoundingClientRect().top
  const minTop = header ? header.offsetHeight : 0
  if (top >= minTop && top <= window.innerHeight * 0.6) {
    return
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

// Lifecycle
onMounted(function () {
  window.addEventListener('keydown', onPageKeydown)
})

onBeforeUnmount(function () {
  window.removeEventListener('keydown', onPageKeydown)
})
</script>

<style lang="scss" scoped>
.timeline {
  .track {
    margin: 0 0 1.5rem;
  }

  .pager {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 0 0 1.25rem;

    @media (width >= 48rem) {
      display: none;
    }

    .pager-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.15rem;
      margin: 0;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-align: center;
      color: var(--ink-2);
    }

    .pager-count {
      font-size: 0.6875rem;
      letter-spacing: 0.1em;
    }

    .pager-dates {
      color: var(--green-ink);
    }
  }
}

.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .swap-enter-active,
  .swap-leave-active {
    transition: none;
  }
}
</style>
