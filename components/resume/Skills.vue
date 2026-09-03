<template>
    <div class="skill-groups noselect">
        <template v-for="group in state['skills']" :key="group.title">
            <div class="skill-section" :style="`--theme: ${group.color};`">
                <div class="skill-title transition-500">
                    {{ group.title }}
                </div>

                <div class="skill-row card flex flex-wrap justify-around items-center content-center px-4 pt-2 pb-1 hover:shadow-md">
                    <template v-for="(item, i) in group.icons" :key="item.name || i">
                        <div class="skill-item flex flex-col justify-center content-center items-center" :style="`--color: ${item.color};`">
                            <div class="skill-icon transition-500" :title="item.name">
                                <span v-if="!item.icon && item.img" class="skill-img" v-html="skillIcons[item.img]"></span>
                                <Icon v-else :name="item.icon" :class="item.class" />
                            </div>

                            <small class="skill-name text-sm text-center transition-500" v-if="props['showSkillNames']"> {{ item.name }} </small>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { skillIcons } from '~/composables/skillIcons'
import { skills } from '~/data/skills'

// Props
const props = defineProps({
    showSkillNames: {
        type: Boolean,
        default: false,
    },
})

// State
const state = reactive({
    unmount: false,
    skills: [],
})

// Functions

// Sweep the `colored` class across skill items: each stays lit HIGHLIGHT_MS,
// the sweep steps every STEP_MS, and pauses LOOP_PAUSE_MS after the last item.
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
onBeforeMount(function () {
    state['skills'] = skills.map(function (group) {
        group['icons'] = group['icons'].filter(function (icon) {
            return icon['showSkills']
        })

        return group
    })
})

onMounted(function () {
    startSkillHighlightLoop()
})

onBeforeUnmount(function () {
    state['unmount'] = true
})
</script>

<style lang="scss" scoped>
@import '../../assets/css/tailwind.css';

.skill-groups {
    /* skill-title variables */
    --fs: 1.125rem;
    --hfs: calc(var(--fs) / 2);
    --tfs: calc(var(--fs) * 2 / 3);

    .skill-section {
        transform: translateY(calc(0rem - var(--tfs)));

        &:hover {
            .skill-title {
                color: var(--theme);
                transform: translate(1rem, var(--tfs));
            }

            .skill-row {
                border: 2px solid var(--theme);
            }
        }

        .skill-title {
            display: inline-block;

            background: linear-gradient(to bottom, var(--color-background-light) calc(50% + 2px), white calc(50% - 2px));

            margin: 0 var(--hfs);
            padding: 0 var(--hfs);

            font-size: var(--fs);
            line-height: var(--fs);
            font-weight: 500;

            transform: translateY(var(--tfs));

            &:not(:first-of-type) {
                margin-top: var(--hfs);
            }
        }

        .skill-row {
            background-color: white;
            border: 2px solid white;
            // border: 2px solid #030712;

            .skill-item {
                width: 5rem;
                height: 5rem;

                &:hover,
                &.colored {
                    color: var(--color);
                }

                &:hover {
                    .skill-icon {
                        transform: scale(1.05);
                    }

                    .skill-name {
                        font-weight: 500;
                    }
                }

                .skill-icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2.5rem;
                    margin: auto;

                    .skill-img {
                        display: flex;
                        width: 2.5rem;
                        height: 2.5rem;

                        svg {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                &:hover,
                &.colored {
                    color: var(--color);
                }

                .skill-name {
                    font-size: min(2.5vh, 0.875rem);
                    margin: -0.75rem 0 0.5rem 0;
                }
            }
        }
    }
}
</style>
