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
                    <js>
                        {{ (isShown = index == state['selectedIndex']) }}
                    </js>
                    <div
                        class="card px-4 py-4"
                        :style="{
                            '--theme': item.color || 'white',
                            '--separator': item.color || '#e5e7eb',
                            '--opacity': isShown ? 1 : 0,
                            '--max-height': isShown ? '100%' : 0,
                            'opacity': 'var(--opacity)',
                            'max-height': 'var(--max-height)',
                        }"
                    >
                        <div class="flex">
                            <!-- Dates -->
                            <div class="dates pr-4 border-r-2 transition-300 hidden md:block" style="flex-shrink: 0">
                                <p class="text-[#60C060] font-mono">
                                    <span>{{ item.start }}</span>
                                    <span v-if="item.end">&nbsp;-&nbsp;</span>
                                    <span v-if="item.end">{{ item.end }}</span>
                                </p>
                            </div>

                            <div class="pl-4 w-full">
                                <!-- Position -->
                                <div class="position flex justify-between">
                                    <div class="block">
                                        <!-- Job title -->
                                        <h4 class="m-0 -mb-2">
                                            <span class="text-xla font-semibold text-[#60C060]">{{ item.title }}</span>
                                        </h4>

                                        <!-- Company -->
                                        <h5 class="m-0">
                                            <a :href="item.link" target="_blank" :title="isShown ? 'Visit website' : null" v-if="item.link">
                                                <span class="text-sm font-semibold text-[#A040A0]">{{ item.company }}</span>
                                                <Icon
                                                    name="solar:link-bold"
                                                    class="fix text-sm inline-block ml-2 hover:scale-110 hover:text-[#4060E0] transition-300"
                                                />
                                            </a>

                                            <span v-else>
                                                <span class="text-sm font-semibold text-[#A040A0]">{{ item.company }}</span>
                                            </span>

                                            <span class="hidden sm:inline">
                                                <span class="text-sm noselect" v-if="item.type"> &nbsp;&nbsp;I&nbsp;&nbsp; </span>

                                                <span class="text-sm text-gray-500" v-if="item.type">
                                                    {{ item.type }}
                                                </span>
                                            </span>
                                        </h5>
                                    </div>

                                    <!-- Image -->
                                    <div class="hidden md:block" v-if="item.image">
                                        <component :is="item.link ? 'a' : 'span'" :href="item.link" target="_blank">
                                            <img
                                                :src="item.image"
                                                :alt="`${item.company} Logo`"
                                                class="rounded-lg"
                                                :style="{
                                                    'max-height': 'calc(1.75rem + 1.75rem - 0.5rem)',
                                                }"
                                                v-if="item.image"
                                            />
                                        </component>
                                    </div>
                                </div>

                                <!-- Dates (sm- screens )-->
                                <p class="text-[#60C060] text-sm mb-4 inline-block sm:hidden">
                                    <span>{{ item.start }}</span>
                                    <span v-if="item.end">&nbsp;-&nbsp;</span>
                                    <span v-if="item.end">{{ item.end }}</span>
                                </p>

                                <!-- Description -->
                                <div class="description mt-2" v-if="item.description">
                                    <p v-html="item.description"></p>
                                </div>

                                <!-- Task list -->
                                <div class="tasks m-0" :title="isShown ? item.tasks : null" v-if="item.tasks">
                                    <div class="mt-4" :title="isShown ? (task.skills || []).join(', ') : null" v-for="task in item.tasks" :key="task">
                                        <h6 class="font-medium text-[#60C060] m-0" v-if="task.title">
                                            {{ task.title }}
                                        </h6>

                                        <template v-for="subtask in task.text" :key="subtask">
                                            <ul class="list-disc list-outside text-black">
                                                <li :class="task.title && task.text.length < 2 ? 'text-transparent ml-4' : 'text-black ml-8'">
                                                    <span class="text-black" v-html="subtask"></span>
                                                </li>
                                            </ul>
                                        </template>

                                        <template v-if="task.skills">
                                            <div class="ml-5">
                                                <template v-for="skill in task.skills" :key="skill">
                                                    <div class="badge mr-1">
                                                        {{ skill }}
                                                    </div>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script setup>
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
    mounted: false,
    unmount: false,

    timeline: [],
    selectedIndex: props['selectedIndex'],
    selectedItem: null,
})

// Methods
function selectItem(index) {
    const maxIndex = state['timeline'].length - 1
    state['selectedIndex'] = Math.min(Math.max(0, index), index, maxIndex)
    state['selectedItem'] = state['timeline'][state['selectedIndex']]
}

// Lifecycle
onBeforeMount(function () {
    const store = useGlobalStore()

    state['timeline'] = store['experience']
})

onMounted(function () {
    state['mounted'] = true

    selectItem(props['selectedIndex'] || state['timeline'].length)
})

onBeforeUnmount(function () {
    state['unmount'] = true
})
</script>

<style lang="scss" scoped>
@import '/assets/css/tailwind.css';

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

        .card {
            flex: 0 0 100%;
            min-width: 100%;
            min-height: 100%;

            border: 2px solid white;

            &:hover {
                border: 2px solid var(--theme);

                .dates {
                    border-color: var(--separator);
                }
            }
        }
    }
}
</style>
