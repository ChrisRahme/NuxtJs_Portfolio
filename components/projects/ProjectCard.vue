<template>
    <div class="project-card card" v-if="state['project']">
        <div class="project-image mb-4" v-if="state['project']['image'] && state['long']">
            <img :src="state['project']['image']" :alt="state['project']['name']" class="rounded shadow-sm" />
        </div>

        <div class="project-title mb-1" v-if="state['project']['name']">
            <h4 class="font-medium">
                {{ project['name'] }}
            </h4>
        </div>

        <div class="project-description" v-if="state['project']['description']">
            <p
                v-html="
                    (state['long'] ? state['project']['description'] : state['project']['summary'])
                        .split('<br>')
                        .map(function (line, index) {
                            return `<span class='block mb-2'>${line}</span>`
                        })
                        .join('')
                "
            ></p>
        </div>

        <div class="project-image my-4" v-if="state['project']['image'] && !state['long']">
            <img :src="state['project']['image']" :alt="state['project']['name']" class="rounded shadow-sm" />
        </div>

        <div class="project-skills mb-2" v-if="state['project']['skills'] && state['project']['skills'].length">
            <template v-for="skill in state['project']['skills']" :key="skill">
                <div class="badge mr-1">
                    {{ skill }}
                </div>
            </template>
        </div>

        <div class="project-footer" v-if="state['project']['links'] && state['project']['links'].length">
            <div class="project-year">
                {{ state['project']['year'] }}
            </div>

            <div class="project-links">
                <template v-for="link in state['project']['links']" :key="link['icon']">
                    <div class="project-link ms-2">
                        <span :title="link['title'] || (link['link'] ? 'Check project' : 'Not published')">
                            <a :href="link['link']" target="_blank" v-if="link['link']">
                                <Icon :name="link['icon']" class="fix" />
                            </a>
                            <template v-else>
                                <Icon :name="link['icon']" class="fix" />
                            </template>
                        </span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
// Props
const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
    long: {
        type: Boolean,
        default: false,
    },
})

const state = reactive({
    mounted: false,
    unmount: false,

    project: null,
    long: false,
})

// Watchers
watchEffect(function () {
    state['project'] = props['project']
})

watchEffect(function () {
    state['long'] = props['long']
})

// Lifecycle
onMounted(function () {
    state['mounted'] = true
})

onBeforeUnmount(function () {
    state['unmount'] = true
})
</script>

<style scoped lang="scss">
@import '/assets/css/tailwind.css';

.project-card {
    @apply transition-300 hover:shadow-lg;

    .project-image {
        img {
            @apply transition-100 hover:shadow-md;
            width: 100%;
            min-height: 200px;
            max-height: 200px;
            object-fit: cover;
        }
    }

    .project-title {
        h4 {
            font-size: 1rem;
        }
    }

    .project-description {
        p {
            @apply text-justify;
            font-size: 0.75rem;
            color: var(--color-background-7);
        }
    }

    .project-skills {
    }

    .project-footer {
        @apply flex justify-between items-end;

        .project-year {
            font-size: 0.75rem;
            // padding-top: 1.5rem;
        }

        .project-links {
            @apply flex;

            .project-link {
                font-size: 2rem;

                a {
                    @apply transition-300;

                    &:hover {
                        color: var(--color-primary);
                    }
                }
            }
        }
    }
}
</style>
