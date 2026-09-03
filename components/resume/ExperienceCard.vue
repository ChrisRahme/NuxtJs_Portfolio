<template>
    <div class="card px-4 py-4" :style="cardStyle">
        <div class="flex">
            <!-- Dates -->
            <div class="dates pr-4 border-r-2 transition-300 hidden md:block" style="flex-shrink: 0">
                <p class="text-[#60C060] font-mono">
                    <ExperienceDates :item="item" />
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
                            <component :is="companyLink.tag" v-bind="companyLink.attrs">
                                <span class="text-sm font-semibold text-[#A040A0]">{{ item.company }}</span>
                                <Icon
                                    name="solar:link-bold"
                                    class="fix text-sm inline-block ml-2 hover:scale-110 hover:text-[#4060E0] transition-300"
                                    v-if="companyLink.isLink"
                                />
                            </component>

                            <span class="hidden sm:inline" v-if="item.type">
                                <span class="text-sm noselect"> &nbsp;&nbsp;I&nbsp;&nbsp; </span>

                                <span class="text-sm text-gray-500">
                                    {{ item.type }}
                                </span>
                            </span>
                        </h5>
                    </div>

                    <!-- Image -->
                    <div class="hidden md:block" v-if="item.image">
                        <component :is="companyLink.tag" v-bind="companyLink.attrs">
                            <NuxtImg
                                :src="item.image"
                                :alt="`${item.company} Logo`"
                                class="rounded-lg"
                                width="48"
                                height="48"
                                format="webp"
                                :style="{
                                    'max-height': 'calc(1.75rem + 1.75rem - 0.5rem)',
                                }"
                            />
                        </component>
                    </div>
                </div>

                <!-- Dates (sm- screens) -->
                <p class="text-[#60C060] text-sm mb-4 inline-block sm:hidden">
                    <ExperienceDates :item="item" />
                </p>

                <!-- Description -->
                <div class="description mt-2" v-if="item.description">
                    <!-- hardcoded content from data/experience.js only — do not pipe user input here -->
                    <p v-html="item.description"></p>
                </div>

                <!-- Task list -->
                <ExperienceTaskList :tasks="item.tasks" v-if="item.tasks" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ExperienceDates from './ExperienceDates.vue'
import ExperienceTaskList from './ExperienceTaskList.vue'

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
})

const cardStyle = computed(function () {
    const theme = props['item'].color || 'white'
    const separator = props['item'].color || '#e5e7eb'
    const shown = props['active'] ? 1 : 0

    return {
        '--theme': theme,
        '--separator': separator,
        '--opacity': shown,
        '--max-height': shown ? '100%' : 0,
        'opacity': 'var(--opacity)',
        'max-height': 'var(--max-height)',
    }
})

// Resolve the company link's tag and anchor attributes ahead of time so the
// template renders it branch-free (used for both the name and the logo)
const companyLink = computed(function () {
    const isLink = Boolean(props['item'].link)

    return {
        isLink,
        tag: isLink ? 'a' : 'span',
        attrs: isLink
            ? {
                  href: props['item'].link,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  title: props['active'] ? 'Visit website' : null,
              }
            : {},
    }
})
</script>

<style lang="scss" scoped>
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
</style>
