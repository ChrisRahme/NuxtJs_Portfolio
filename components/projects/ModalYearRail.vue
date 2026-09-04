<template>
    <nav class="rail" aria-label="Projects by year">
        <p class="rail-caption" aria-hidden="true">{{ caption }}</p>

        <ol ref="yearsRef" class="rail-years">
            <li v-for="group in groups" :key="group['year']" class="rail-year" :class="{ current: group['year'] === current['year'] }">
                <ol class="rail-stars">
                    <li v-for="project in group['projects']" :key="project['name']">
                        <button
                            type="button"
                            class="rail-star"
                            :class="{ current: project['name'] === current['name'] }"
                            :aria-current="project['name'] === current['name'] ? 'true' : undefined"
                            :aria-label="`${project['name']}, ${project['year']}`"
                            @click="emit('select', project)"
                            @mouseenter="state['hovered'] = project"
                            @mouseleave="state['hovered'] = null"
                            @focus="state['hovered'] = project"
                            @blur="state['hovered'] = null"
                        ></button>
                    </li>
                </ol>

                <span class="rail-label">{{ group['year'] }}</span>
            </li>
        </ol>
    </nav>
</template>

<script setup>
// Props
const props = defineProps({
    projects: {
        type: Array,
        required: true,
    },
    current: {
        type: Object,
        required: true,
    },
})

// Emits
const emit = defineEmits(['select'])

const yearsRef = ref(null)

const state = reactive({
    hovered: null,
})

const groups = computed(function () {
    const byYear = new Map()

    props['projects']
        .slice()
        .reverse()
        .forEach(function (project) {
            if (!byYear.has(project['year'])) byYear.set(project['year'], [])
            byYear.get(project['year']).push(project)
        })

    return Array.from(byYear.entries())
        .sort(function (a, b) {
            return a[0] - b[0]
        })
        .map(function ([year, projects]) {
            return { year, projects }
        })
})

const caption = computed(function () {
    const hovered = state['hovered']
    return hovered ? `${hovered['name']} · ${hovered['year']}` : ''
})

// Methods
function revealCurrent() {
    const container = yearsRef.value
    if (!container || container.scrollWidth <= container.clientWidth) return

    const star = container.querySelector('.rail-star.current')
    if (!star) return

    const containerRect = container.getBoundingClientRect()
    const starRect = star.getBoundingClientRect()
    const left = container.scrollLeft + (starRect.left - containerRect.left) - (containerRect.width - starRect.width) / 2
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    container.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' })
}

// Watchers
watch(
    () => props['current'],
    function () {
        nextTick(revealCurrent)
    }
)

// Lifecycle
onMounted(revealCurrent)
</script>

<style scoped lang="scss">
.rail {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem clamp(0.75rem, 3vw, 2rem) 0.9rem;
}

.rail-caption {
    margin: 0;
    height: 1rem;
    font-family: var(--font-mono);
    font-size: 0.625rem;
    letter-spacing: 0.18em;
    line-height: 1rem;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--star);
}

.rail-years {
    display: flex;
    align-items: flex-end;
    gap: 0.75rem;
    max-width: 100%;
    margin: -0.5rem 0 -0.25rem;
    padding: 0.75rem 0.75rem 0.25rem;
    list-style: none;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.rail-year {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
}

.rail-stars {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
}

.rail-star {
    position: relative;
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: none;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: var(--star-dim);
        transform: translate(-50%, -50%);
        transition:
            background-color 200ms ease,
            box-shadow 300ms ease,
            transform 200ms ease;
    }

    &:hover::before {
        background: var(--star);
        transform: translate(-50%, -50%) scale(1.4);
    }

    &.current::before {
        background: var(--green-light);
        transform: translate(-50%, -50%) scale(1.8);
        box-shadow:
            0 0 0 3px rgba(144, 240, 144, 0.16),
            0 0 14px rgba(144, 240, 144, 0.75);
    }

    &:focus-visible {
        outline: 2px solid var(--green-light);
        outline-offset: 0;
    }
}

.rail-label {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    letter-spacing: 0.1em;
    line-height: 1;
    color: var(--star-dim);
    transition: color 200ms ease;
}

.rail-year.current .rail-label {
    color: var(--star);
}

@media (width < 40rem) {
    .rail-years {
        gap: 0.5rem;
    }

    .rail-star {
        width: 1.125rem;
        height: 1.125rem;
    }
}

@media (width < 30rem) {
    .rail-label {
        display: none;
    }

    .rail-year.current .rail-label {
        display: block;
    }
}

@media (prefers-reduced-motion: reduce) {
    .rail-star::before,
    .rail-label {
        transition: none;
    }
}
</style>
