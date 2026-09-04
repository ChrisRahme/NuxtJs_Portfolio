<template>
    <div class="timeline" ref="timelineEl" v-if="state['timeline'].length">
        <ExperienceTrack :items="state['timeline']" :selected-index="state['selectedIndex']" :today="today" @select="selectItem" />

        <div class="pager">
            <button
                type="button"
                class="btn-ghost btn-icon"
                :disabled="state['selectedIndex'] <= 0"
                @click="selectItem(state['selectedIndex'] - 1)"
                aria-label="Previous role"
            >
                <Icon name="ph:caret-left" />
            </button>

            <p class="pager-label" v-if="state['selectedItem']">
                <span class="pager-count">{{ state['selectedIndex'] + 1 }} / {{ state['timeline'].length }}</span>
                <span class="pager-dates"><ExperienceDates :item="state['selectedItem']" /></span>
            </p>

            <button
                type="button"
                class="btn-ghost btn-icon"
                :disabled="state['selectedIndex'] >= state['timeline'].length - 1"
                @click="selectItem(state['selectedIndex'] + 1)"
                aria-label="Next role"
            >
                <Icon name="ph:caret-right" />
            </button>
        </div>

        <Transition name="swap" mode="out-in">
            <ExperienceCard :key="state['selectedIndex']" :item="state['selectedItem']" v-if="state['selectedItem']" />
        </Transition>
    </div>
</template>

<script setup>
import ExperienceCard from './ExperienceCard.vue'
import ExperienceDates from './ExperienceDates.vue'
import ExperienceTrack from './ExperienceTrack.vue'
import { experience } from '~/data/experience'
import { slugify } from '~/utils/text'

const today = useTodayMonth()

// `?role=<company slug>` (from the home page track) preselects a role; the current one is the default
const route = useRoute()
const lastIndex = experience.length - 1
const requestedIndex = experience.findIndex(function (item) {
    return slugify(item['company']) === route.query['role']
})
const initialIndex = requestedIndex >= 0 ? requestedIndex : lastIndex

const timelineEl = ref(null)

// State
const state = reactive({
    timeline: experience,
    selectedIndex: initialIndex,
    selectedItem: experience[initialIndex] || null,
})

// Methods
function selectItem(index) {
    state['selectedIndex'] = Math.max(0, Math.min(index, lastIndex))
    state['selectedItem'] = state['timeline'][state['selectedIndex']]
}

function isTypingTarget(target) {
    return Boolean(target && target.closest && target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'))
}

function onPageKeydown(event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return
    if (isTypingTarget(event.target)) return

    let next = null
    if (event.key === 'ArrowRight') next = state['selectedIndex'] + 1
    else if (event.key === 'ArrowLeft') next = state['selectedIndex'] - 1
    if (next === null || next < 0 || next > lastIndex) return

    event.preventDefault()
    selectItem(next)
    revealTimeline()
}

function revealTimeline() {
    const element = timelineEl.value
    if (!element) return

    const header = document.getElementById('header')
    const top = element.getBoundingClientRect().top
    const minTop = header ? header.offsetHeight : 0
    if (top >= minTop && top <= window.innerHeight * 0.6) return

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
