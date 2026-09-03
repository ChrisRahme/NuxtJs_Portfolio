<!-- Horizontal interactive timeline -->

<template>
    <div
        class="timeline"
        :style="{
            '--dot-start': props['showDotStart'] ? 'visible' : 'hidden',
            '--dot-end': props['showDotEnd'] ? 'visible' : 'hidden',
            '--dot-size': props['dotSize'],
            '--dot-color-active': props['dotColorActive'],
            '--dot-color-inactive': props['dotColorInactive'],
            '--dot-color-hover': props['dotColorHover'],
            '--line-thickness': props['lineThickness'],
            '--line-color': props['lineColor'],
        }"
    >
        <template v-if="state['timeline'] && state['timeline'].length > 0">
            <!-- Show horizontal timeline on md+ screens -->
            <div class="dots mb-4 noselect hidden md:block">
                <div class="line"></div>

                <div class="flex justify-between items-center w-full min-w-ful">
                    <div class="dot big start"></div>

                    <template v-for="(item, index) in state['timeline']" :key="item.title">
                        <div class="dot flex flex-col items-center" :class="{ active: state['selectedIndex'] === index }" @click="selectItem(index)">
                            <h5 class="year inline-block">
                                {{ item.start.split(' ')[1] }}
                            </h5>
                        </div>
                    </template>

                    <div class="dot big end"></div>
                </div>
            </div>

            <!-- Show previous/next buttons on md- screens -->
            <div class="buttons mb-4 noselect block md:hidden">
                <div class="flex justify-between items-center">
                    <div>
                        <button class="btn mr-4" :disabled="state['selectedIndex'] <= 0" @click="selectItem(0)">
                            <Icon name="ph:caret-line-left" class="fix text-2xl" />
                        </button>

                        <button class="btn" :disabled="state['selectedIndex'] <= 0" @click="selectItem(state['selectedIndex'] - 1)">
                            <Icon name="ph:caret-left" class="fix text-2xl" />
                        </button>
                    </div>

                    <p class="text-[#A040A0] text-center font-medium hidden sm:inline-block" v-if="state['selectedItem']">
                        <span>{{ state['selectedItem'].start }}</span>

                        <template v-if="state['selectedItem'].end">
                            <span class="hidden sm:inline">&nbsp;-&nbsp;</span>
                            <br class="sm:hidden" />
                            <span>{{ state['selectedItem'].end }}</span>
                        </template>
                    </p>

                    <div>
                        <button class="btn" :disabled="state['selectedIndex'] >= state['timeline'].length - 1" @click="selectItem(state['selectedIndex'] + 1)">
                            <Icon name="ph:caret-right" class="fix text-2xl" />
                        </button>

                        <button
                            class="btn ml-4"
                            :disabled="state['selectedIndex'] >= state['timeline'].length - 1"
                            @click="selectItem(state['timeline'].length)"
                        >
                            <Icon name="ph:caret-line-right" class="fix text-2xl" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Detail cards -->
            <div
                class="details transition-500"
                :style="{
                    transform: `translateX(${-100 * state['selectedIndex']}%)`,
                }"
            >
                <template v-for="(item, index) in state['timeline']" :key="item.title">
                    <ExperienceCard :item="item" :active="index === state['selectedIndex']" />
                </template>
            </div>
        </template>
    </div>
</template>

<script setup>
import ExperienceCard from './ExperienceCard.vue'
import { experience } from '~/data/experience'

// Props
const props = defineProps({
    dotSize: {
        type: String,
        default: '1.5rem',
    },
    dotColorActive: {
        type: String,
        default: '#60c060',
    },
    dotColorInactive: {
        type: String,
        default: '#ffffff',
    },
    dotColorHover: {
        type: String,
        default: '#90f090',
    },
    showDotStart: {
        type: Boolean,
        default: false,
    },
    showDotEnd: {
        type: Boolean,
        default: false,
    },
    lineThickness: {
        type: String,
        default: '2px',
    },
    lineColor: {
        type: String,
        default: '#040909',
    },
    selectedIndex: {
        type: Number,
        default: null,
    },
})

// State
const state = reactive({
    timeline: [],
    selectedIndex: props['selectedIndex'],
    selectedItem: null,
})

// Methods
function selectItem(index) {
    const maxIndex = state['timeline'].length - 1
    state['selectedIndex'] = Math.max(0, Math.min(index, maxIndex))
    state['selectedItem'] = state['timeline'][state['selectedIndex']]
}

// Lifecycle
onBeforeMount(function () {
    state['timeline'] = experience
})

onMounted(function () {
    selectItem(props['selectedIndex'] || state['timeline'].length)
})
</script>

<style lang="scss" scoped>
@import '../../assets/css/tailwind.css';

.timeline {
    .dots {
        .line {
            @apply block shadow-md;

            width: 100%;
            height: var(--line-thickness);

            background-color: var(--line-color);
            border-radius: var(--line-thickness);

            transform: translateY(calc(var(--dot-size) + var(--line-thickness) / 2));
            z-index: 0;
        }

        .dot {
            @apply block shadow-md;

            border: var(--line-thickness) solid var(--line-color);
            border-radius: 50%;

            z-index: 1;

            &.start,
            &.end {
                width: calc(var(--dot-size) * 2);
                height: calc(var(--dot-size) * 2);

                background-color: white;
                cursor: default;
            }

            &.start {
                visibility: var(--dot-start);
            }

            &.end {
                visibility: var(--dot-end);
            }

            &:not(.start):not(.end) {
                @apply transition-500;

                width: var(--dot-size);
                height: var(--dot-size);

                background-color: white;
                cursor: pointer;

                &:hover {
                    @apply shadow-lg scale-110 font-medium;
                    background-color: var(--dot-color-hover);

                    .year {
                        color: var(--dot-color-hover);
                    }
                }

                &.active {
                    @apply font-medium;
                    background-color: var(--dot-color-active);

                    .year {
                        color: var(--dot-color-active);
                    }
                }

                .year {
                    @apply transition-500;

                    font-size: calc(var(--dot-size) * 2 / 3);
                    transform: translate(calc((var(--dot-size) / 2) - var(--line-thickness) - 50%), calc(0% - var(--dot-size)));
                }
            }
        }
    }

    .details {
        display: flex;
    }
}
</style>
