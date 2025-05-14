<template>
    <div id="projects" class="flex flex-col justify-center">
        <div class="flex justify-center my-4">
            <h1>Projects</h1>
        </div>

        <div class="flex flex-wrap justify-center">
            <template v-for="project in state['projects']" :key="project['name']">
                <div class="project-card-wrapper">
                    <Project :project="project" :long="state['long']" />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import Project from '../components/projects/Project.vue'

const state = reactive({
    projects: [],
    long: false,
})

// Lifecycle
onBeforeMount(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const store = useGlobalStore()

    state['projects'] = store['projects'].sort(function (a, b) {
        return b['year'] - a['year']
    })
})
</script>

<style scoped lang="scss">
#projects {
    /* underline h1 */
    h1 {
        @apply m-0 font-medium;

        color: var(--color-background-dark);
        font-size: 1.75rem;

        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 1.5px;
            background: var(--color-primary);
            transform: translateY(-0.125rem);
        }
    }

    .project-card-wrapper {
        --gap: 1rem;
        --n-items: 1;

        @media (width >= theme('screens.lg')) {
            --n-items: 2;
        }
        @media (width >= theme('screens.xl')) {
            --n-items: 3;
        }
        @media (width >= theme('screens.3xl')) {
            --n-items: 4;
        }

        & {
            width: calc(100% / var(--n-items) - 2 * var(--gap));
            // max-width: 500px;
            padding: var(--gap);
        }
    }
}
</style>
