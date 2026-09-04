<template>
    <section id="work" v-if="rows.length">
        <div class="wrap">
            <div class="section-head reveal">
                <h2>Featured projects</h2>
            </div>

            <div class="work-rows">
                <ul v-for="(row, rowIndex) in rows" :key="rowIndex" class="work-row" :class="`cols-${row['items'].length}`">
                    <li v-for="project in row['items']" :key="project['name']" class="reveal">
                        <NuxtLink
                            :to="{ path: '/projects', query: { project: slugify(project['name']) } }"
                            class="project-link"
                            :aria-label="`${project['name']}: open on the projects page`"
                        >
                            <ProjectCard :project="project" :mirror="row['mirror']" />
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div class="grid-foot reveal">
                <NuxtLink to="/projects" class="btn-ghost">
                    <span>All {{ projects.length }} projects</span>
                    <Icon name="mdi:arrow-right" aria-hidden="true" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup>
import ProjectCard from '~/components/projects/ProjectCard.vue'
import { projects } from '~/data/projects'
import { sortProjects } from '~/utils/projects'
import { slugify } from '~/utils/text'

const FEATURED_COUNT = 4

const featured = sortProjects(projects)
    .filter(function (project) {
        return project['featured']
    })
    .slice(0, FEATURED_COUNT)

// Row sizes for a given number of cards
const ROW_PLANS = {
    1: [1],
    2: [1, 1],
    3: [1, 2],
    4: [1, 3],
    5: [2, 3],
    6: [1, 2, 3],
}

function planRows(count) {
    if (ROW_PLANS[count]) return ROW_PLANS[count]

    const sizes = [1]
    let left = count - 1

    while (left > 0) {
        if (left === 4) {
            sizes.push(2, 2)
            break
        }

        const size = Math.min(3, left)
        sizes.push(size)
        left -= size
    }

    return sizes
}

// Every second full-width row puts its image on the right
const rows = []
let cursor = 0

planRows(featured.length).forEach(function (size, rowIndex) {
    const items = featured.slice(cursor, cursor + size)
    cursor += size

    rows.push({
        items,
        mirror: size === 1 && rowIndex % 2 === 1,
    })
})
</script>

<style scoped lang="scss">
#work {
    padding-block: var(--space-section);
    background-color: var(--paper);
    color: var(--ink);

    .work-rows {
        --gap: 1.25rem;

        display: grid;
        gap: var(--gap);

        @media (width >= 1280px) {
            --gap: 1.5rem;
        }
    }

    .work-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: var(--gap);
        margin: 0;
        padding: 0;
        list-style: none;

        @media (width >= 48rem) {
            &.cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            &.cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
        }

        // Tablets
        @media (width >= 48rem) and (width < 64rem) {
            &.cols-3 {
                grid-template-columns: repeat(2, minmax(0, 1fr));

                > li:first-child {
                    --card-direction: row-reverse;

                    grid-column: 1 / -1;
                }
            }
        }
    }

    .project-link {
        display: block;
        height: 100%;
        border-radius: var(--r-card);
        color: inherit;
        text-decoration: none;

        &:focus-visible {
            outline: 2px solid var(--green);
            outline-offset: 4px;
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
}
</style>
