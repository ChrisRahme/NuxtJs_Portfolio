<template>
    <div class="education noselect md:flex justify-between items-center">
        <div class="education-delimiter"></div>

        <template v-for="(item, index) in state['timeline']" :key="item.title">
            <div class="education-item mb-8 md:mb-0">
                <!-- Show interactive cards on md+ screens -->
                <div
                    class="card rounded-full hidden md:flex justify-center items-center"
                    :class="{
                        active: state['selectedIndex'] == index,
                    }"
                    :style="{
                        '--theme': item.color || '#60C060',
                    }"
                    @click="selectDot(index)"
                >
                    <div class="icon">
                        <Icon :name="item.icon" :class="item.class" />
                    </div>

                    <div class="info">
                        <!-- Diploma -->
                        <h4 class="m-0 -mt-2 -mb-2">
                            <span class="font-semibold">{{ item.title }}</span>
                        </h4>

                        <!-- Institution -->
                        <h5 class="m-0 mb-2">
                            <a :href="item.link" target="_blank" title="Visit website" v-if="item.link">
                                <span class="text-sm font-semibold text-[#A040A0]">{{ item.institution }}</span>
                                <Icon name="solar:link-bold" class="fix text-sm inline-block ml-2 hover:scale-110 hover:text-[#4060E0] transition-300" />
                            </a>

                            <span class="text-sm font-semibold text-[#A040A0]" v-else> {{ item.institution }}</span>
                        </h5>

                        <!-- Dates -->
                        <p class="font-mono">{{ item.start }}&nbsp;-&nbsp;{{ item.end }}</p>
                    </div>
                </div>

                <!-- Show opened info cards on mobile -->
                <div
                    class="card flex md:hidden justify-items-start items-center opened"
                    :style="{
                        '--theme': item.color || '#60C060',
                    }"
                >
                    <div class="icon hidden xs:block">
                        <Icon :name="item.icon" :class="item.class" />
                    </div>

                    <div class="info">
                        <h4 class="m-0 -mt-2 -mb-2">
                            <span class="text-lg font-medium">{{ item.title }}</span>
                        </h4>

                        <h5 class="m-0 mb-2">
                            <a :href="item.link" target="_blank" title="Visit website" v-if="item.link">
                                <span class="text-sm font-medium text-[#A040A0]">{{ item.institution }}</span>
                            </a>

                            <span class="text-sm font-semibold text-[#A040A0]" v-else> {{ item.institution }}</span>
                        </h5>

                        <p class="font-mono">{{ item.start }}&nbsp;-&nbsp;{{ item.end }}</p>
                    </div>
                </div>
            </div>

            <div class="education-delimiter"></div>
        </template>
    </div>
</template>

<script setup>
// Props
const props = defineProps({})

// State
const state = reactive({
    mounted: false,
    unmount: false,

    timeline: [],
    selectedIndex: props['selectedIndex'],
})

// Methods
function selectDot(index) {
    const maxIndex = state['timeline'].length - 1
    state['selectedIndex'] = Math.min(Math.max(0, index), index, maxIndex)
}

// Lifecycle
onBeforeMount(function () {
    const store = useGlobalStore()

    state['timeline'] = store['education']
})

onMounted(function () {
    state['mounted'] = true

    selectDot(props['selectedIndex'] || state['timeline'].length)
})

onBeforeUnmount(function () {
    state['unmount'] = true
})
</script>

<style lang="scss" scoped>
@import '/assets/css/tailwind.css';

.education {
    .education-delimiter {
        width: 1px;
        max-width: 1px;
    }

    .education-item > div {
        --size: 5rem;
        --space: calc(var(--size) / 4);

        line-height: 0;

        padding: var(--space);
        margin: 0;

        border: 2px solid white;
        cursor: pointer;

        &:hover,
        &.active {
            border-color: var(--theme);

            .icon {
                @apply scale-110;
                color: var(--theme);
            }
        }

        &.active,
        &.opened {
            font-weight: bold;

            .icon {
                color: var(--theme);
            }

            .info {
                margin: 0 var(--space);
            }
        }

        &:not(.active):not(.opened) {
            .info {
                margin: 0;
                padding: 0;
                max-width: 0px;
                max-height: 0px;
                overflow: hidden;
                opacity: 0;
                line-height: 0;
                color: transparent;
            }
        }

        .icon {
            @apply transition-300;
            font-size: var(--size);
        }

        .info {
            @apply transition-300;

            h4 {
                color: var(--theme);
            }
        }
    }
}
</style>
