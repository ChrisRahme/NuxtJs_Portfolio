<template>
    <div id="projects" class="flex flex-col justify-center">
        <div class="flex justify-center mt-4 mb-8">
            <h1>Projects</h1>
        </div>

        <div id="cards" class="flex flex-wrap gap-4 justify-center">
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

    state['projects'] = store['projects']
        .map(function (project, index) {
            return {
                ...project,
                index: index,
            }
        })
        .sort(function (a, b) {
            // Sort by year descending, or by index if same year
            if (b['year'] !== a['year']) {
                return b['year'] - a['year']
            }
            return b['index'] - a['index']
        })
        .map(function (data) {
            // Remove index after sorting
            const { index, ...project } = data
            return project
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

    #cards {
        .project-card-wrapper {
            padding: 0;
            width: 100%;

            @media (width < theme('screens.md')) {
                max-width: 100%;
            }

            @media (width >= theme('screens.md')) and (width < theme('screens.lg')) {
                max-width: 350px;
            }

            @media (width >= theme('screens.lg')) and (width < theme('screens.2xl')) {
                max-width: 400px;
            }

            @media (width >= theme('screens.2xl')) {
                max-width: 500px;
            }
        }
    }
}
</style>
