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
                                <Icon :name="item.icon" :class="item.class" />
                            </div>

                            <small class="skill-name text-sm text-center transition-500" v-if="state['showSkillNames']"> {{ item.name }} </small>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
// Props
const props = defineProps({
    showSkillNames: {
        type: Boolean,
        default: false,
    },
})

// State
const state = reactive({
    mounted: false,
    unmount: false,

    skills: [],
    showSkillNames: false,
})

// Functions
function highlightSkill(skills, index) {
    const t = 500

    skills = skills || Array.from(document.getElementsByClassName('skill-item'))
    const N = skills.length

    index = (index || 0) % N

    // Get random skill
    const skill = skills[index]

    // Add `hover` class if not already present
    if (!skill.classList.contains('colored')) {
        skill.classList.add('colored')

        // Remove `hover` class after `duration` ms
        setTimeout(function () {
            skill.classList.remove('colored')
        }, t)
    }

    if (state['unmount']) return

    // Call `randomHoverSkill` again after `nextTrigger` ms
    setTimeout(
        function () {
            highlightSkill(skills, index + 1)
        },
        index == N - 1 ? t * 3 : t / 3
    )
}

// Watchers
watchEffect(function () {
    state['showSkillNames'] = props['showSkillNames']
})

// Lifecycle
onBeforeMount(function () {
    const store = useGlobalStore()

    state['skills'] = store['skills'].map(function (group) {
        group['icons'] = group['icons'].filter(function (icon) {
            return icon['showSkills']
        })

        return group
    })
})

onMounted(function () {
    state['mounted'] = true

    highlightSkill()
})

onBeforeUnmount(function () {
    state['unmount'] = true
})
</script>

<style lang="scss" scoped>
@import '/assets/css/tailwind.css';

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
                    display: inline-block;
                    font-size: 2.5rem;
                    margin: auto;
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
