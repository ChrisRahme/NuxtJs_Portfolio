<template>
    <div id="projects">
        <PageBand :eyebrow="`${state['projects'].length} projects · ${yearSpan}`" title="Projects" lead="My side projects. Click on one for more info.">
            <template #aside>
                <div class="view-switch" role="radiogroup" aria-label="Projects to show">
                    <button
                        v-for="option in VIEWS"
                        :key="option['id']"
                        type="button"
                        role="radio"
                        class="view-option"
                        :class="{ active: state['view'] === option['id'] }"
                        :aria-checked="state['view'] === option['id']"
                        @click="setView(option['id'])"
                    >
                        <Icon :name="option['icon']" aria-hidden="true" v-if="option['icon']" />
                        <span>{{ option['label'] }}</span>
                        <span class="count">{{ option['id'] === 'featured' ? featuredProjects.length : state['projects'].length }}</span>
                    </button>
                </div>
            </template>
        </PageBand>

        <div class="wrap page-body">
            <ul class="project-grid" :class="`view-${state['view']}`">
                <li v-for="(project, index) in visibleProjects" :key="project['name']" class="reveal" :class="{ lead: isLead(index) }">
                    <button type="button" class="project-button" @click="openModal(project)" :aria-label="`Open details for ${project['name']}`">
                        <ProjectCard :project="project" />
                    </button>
                </li>
            </ul>

            <div class="grid-foot">
                <button type="button" class="btn-ghost" @click="setView('all')" v-if="state['view'] === 'featured'">
                    <span>Show all {{ state['projects'].length }} projects</span>
                    <Icon name="mdi:arrow-right" aria-hidden="true" />
                </button>

                <p class="footnote eyebrow" v-else>…and many unfinished ones.</p>
            </div>
        </div>

        <ProjectModal
            :project="state['selectedProject']"
            :projects="visibleProjects"
            :visible="state['modalVisible']"
            @close="closeModal"
            @select="showProject"
        />
    </div>
</template>

<script setup>
import PageBand from '~/components/PageBand.vue'
import ProjectCard from '~/components/projects/ProjectCard.vue'
import ProjectModal from '~/components/projects/ProjectModal.vue'
import { projects } from '~/data/projects'
import { sortProjects } from '~/utils/projects'
import { slugify } from '~/utils/text'

useHead({
    title: 'Projects | Chris Rahmé',
    meta: [
        { name: 'description', content: 'Selected projects by Chris Rahmé — full-stack apps, AI/ML systems, IoT, music tools, and more.' },
        { property: 'og:title', content: 'Projects | Chris Rahmé' },
        { property: 'og:description', content: 'Selected projects by Chris Rahmé — full-stack apps, AI/ML systems, IoT, music tools, and more.' },
        { property: 'og:url', content: 'https://chrisrahme.dev/projects' },
        { name: 'twitter:title', content: 'Projects | Chris Rahmé' },
        { name: 'twitter:description', content: 'Selected projects by Chris Rahmé — full-stack apps, AI/ML systems, IoT, music tools, and more.' },
    ],
})

const sortedProjects = sortProjects(projects)

const years = sortedProjects.map(function (project) {
    return project['year']
})
const yearSpan = `${Math.min(...years)} — ${Math.max(...years)}`

const VIEWS = [
    { id: 'featured', label: 'Featured', icon: 'mdi:star-four-points' },
    { id: 'all', label: 'All', icon: null },
]

const state = reactive({
    projects: sortedProjects,
    view: 'featured',
    selectedProject: null,
    modalVisible: false,
})

const featuredProjects = sortedProjects.filter(function (project) {
    return project['featured']
})

const visibleProjects = computed(function () {
    return state['view'] === 'featured' ? featuredProjects : state['projects']
})

// Methods
function setView(view) {
    state['view'] = view
}

function isLead(index) {
    return state['view'] === 'featured' && index === 0
}

function openModal(project) {
    state['selectedProject'] = project
    state['modalVisible'] = true
}

function closeModal() {
    state['modalVisible'] = false
}

function showProject(project) {
    state['selectedProject'] = project
}

// `?project=<slug>` (from the home page cards) opens that project on arrival
const route = useRoute()

function openRequestedProject() {
    const slug = route.query['project']
    if (!slug) return

    const project = sortedProjects.find(function (candidate) {
        return slugify(candidate['name']) === slug
    })
    if (!project) return

    if (!project['featured']) setView('all')
    openModal(project)
}

// Lifecycle
onMounted(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    openRequestedProject()
})
</script>

<style scoped lang="scss">
#projects {
    .page-body {
        padding-block: clamp(2.5rem, 5vw, 4rem) var(--space-section);
    }

    .project-grid {
        display: grid;
        gap: 1.25rem;
        margin: 0;
        padding: 0;
        list-style: none;

        @media (width >= 1280px) {
            gap: 1.5rem;
        }

        &.view-all {
            grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
        }

        /* Featured: one wide lead card, then two columns */
        &.view-featured {
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr));

            .lead {
                grid-column: 1 / -1;
            }
        }
    }

    .view-switch {
        display: inline-flex;
        padding: 0.25rem;
        border: 1px solid var(--sky-line);
        border-radius: var(--r-pill);
        background: rgba(244, 239, 230, 0.06);
    }

    .view-option {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.45rem 0.95rem;
        border: 0;
        border-radius: var(--r-pill);
        background: transparent;
        font: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.2;
        color: var(--star-dim);
        cursor: pointer;
        transition:
            background-color 200ms ease,
            color 200ms ease;

        .iconify {
            font-size: 1rem;
        }

        .count {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            opacity: 0.75;
        }

        &:hover {
            color: var(--star);
        }

        &.active {
            background: var(--green);
            color: var(--sky-zenith);

            .count {
                opacity: 0.85;
            }
        }

        &:focus-visible {
            outline-color: var(--green-light);
        }
    }

    .grid-foot {
        display: flex;
        justify-content: center;
        margin-top: 2.5rem;

        .btn-ghost .iconify {
            font-size: 1.1rem;
        }
    }

    .project-button {
        appearance: none;
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: var(--r-card);
        background: none;
        font: inherit;
        color: inherit;
        text-align: inherit;
        cursor: pointer;

        &:focus-visible {
            outline: 2px solid var(--green);
            outline-offset: 4px;
        }
    }

    .footnote {
        margin: 0;
        text-align: center;
        color: var(--ink-2);
    }
}
</style>
