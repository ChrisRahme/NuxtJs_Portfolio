<template>
    <div id="projects" class="flex flex-col justify-center">
        <div class="flex justify-center mt-4 mb-8">
            <h1>Projects</h1>
        </div>

        <div id="cards" class="flex flex-wrap gap-4 justify-center">
            <template v-for="project in state['projects']" :key="project['name']">
                <div class="project-card-wrapper" @click="openModal(project)">
                    <ProjectCard :project="project" :long="state['long']" />
                </div>
            </template>
        </div>

        <div class="flex justify-center mt-8 mb-4">
            <span class="italic text-gray-600 text-sm"> And many unfinished projects... </span>
        </div>

        <ProjectModal
            :project="state['selectedProject']"
            :visible="state['modalVisible']"
            @close="closeModal"
            @next="nextProject"
            @previous="previousProject"
        />
    </div>
</template>

<script setup>
import ProjectCard from '../components/projects/ProjectCard.vue'
import ProjectModal from '../components/projects/ProjectModal.vue'

const state = reactive({
    projects: [],
    long: false,
    selectedProject: null,
    modalVisible: false,
})

// Methods
function openModal(project) {
    state['selectedProject'] = project
    state['modalVisible'] = true
}

function closeModal() {
    state['modalVisible'] = false
}

function navigateProject(direction) {
    const currentIndex = state['projects'].findIndex((p) => p['name'] === state['selectedProject']['name'])
    let newIndex = currentIndex

    if (direction > 0) {
        newIndex = currentIndex === state['projects'].length - 1 ? 0 : currentIndex + 1
    } else {
        newIndex = currentIndex === 0 ? state['projects'].length - 1 : currentIndex - 1
    }

    state['selectedProject'] = state['projects'][newIndex]
}

function nextProject() {
    navigateProject(+1)
}

function previousProject() {
    navigateProject(-1)
}

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
            cursor: pointer;

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
