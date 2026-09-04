<template>
    <div class="skill-groups">
        <section class="card skill-group" v-for="group in groups" :key="group['title']" :style="{ '--theme': group['color'] }">
            <h3 class="eyebrow skill-group-title">{{ group['title'] }}</h3>

            <ul class="skill-list">
                <li class="skill-item" v-for="item in group['icons']" :key="item['name']" :style="{ '--color': item['color'] }">
                    <span class="skill-icon" aria-hidden="true">
                        <span v-if="!item['icon'] && item['img']" class="skill-img" v-html="skillIcons[item['img']]"></span>
                        <Icon v-else :name="item['icon']" />
                    </span>
                    <span class="skill-name">{{ item['name'] }}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup>
import { skillIcons } from '~/composables/skillIcons'
import { skills } from '~/data/skills'

const groups = skills.map(function (group) {
    return {
        ...group,
        icons: group['icons'].filter(function (icon) {
            return icon['showSkills']
        }),
    }
})

// State
const state = reactive({
    unmount: false,
})

function startSkillHighlightLoop() {
    const HIGHLIGHT_MS = 500
    const STEP_MS = HIGHLIGHT_MS / 3
    const LOOP_PAUSE_MS = HIGHLIGHT_MS * 3

    const items = Array.from(document.getElementsByClassName('skill-item'))
    if (!items.length) return

    let index = 0

    function step() {
        if (state['unmount']) return

        const item = items[index]
        if (!item.classList.contains('colored')) {
            item.classList.add('colored')
            setTimeout(function () {
                item.classList.remove('colored')
            }, HIGHLIGHT_MS)
        }

        const wrapped = index === items.length - 1
        index = (index + 1) % items.length
        setTimeout(step, wrapped ? LOOP_PAUSE_MS : STEP_MS)
    }

    step()
}

// Lifecycle
onMounted(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    startSkillHighlightLoop()
})

onBeforeUnmount(function () {
    state['unmount'] = true
})
</script>

<style lang="scss" scoped>
.skill-groups {
    display: grid;
    gap: 1.25rem;

    .skill-group {
        padding: 1.25rem clamp(1rem, 3vw, 1.5rem) 1rem;
        transition: border-color 200ms ease;

        &:hover {
            border-color: var(--theme);
        }
    }

    .skill-group-title {
        margin: 0 0 1rem;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.18em;
        color: var(--theme);
    }

    .skill-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
        gap: 0.5rem 0.25rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .skill-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        padding: 0.6rem 0.25rem;
        border-radius: 0.75rem;
        color: var(--ink-2);
        text-align: center;
        transition:
            color 300ms ease,
            background-color 300ms ease;

        &:hover,
        &.colored {
            color: var(--color);
        }

        &:hover {
            background: var(--paper-2);

            .skill-icon {
                transform: translateY(-2px) scale(1.08);
            }
        }
    }

    .skill-icon {
        display: grid;
        place-items: center;
        width: 2.25rem;
        height: 2.25rem;
        font-size: 2rem;
        line-height: 0;
        transition: transform 300ms ease;

        .skill-img {
            display: block;
            width: 2rem;
            height: 2rem;

            :deep(svg) {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }

    .skill-name {
        font-size: 0.75rem;
        line-height: 1.2;
        color: var(--ink);
    }
}
</style>
