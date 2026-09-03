<template>
    <div class="modal-body">
        <div class="modal-header">
            <h2 :id="titleId" class="modal-title">{{ project['name'] }}</h2>
            <span class="modal-year">{{ project['year'] }}</span>
        </div>

        <div class="modal-description" v-if="project['description']">
            <!-- hardcoded content from data/projects.js only — do not pipe user input here -->
            <p v-html="project['description']"></p>
        </div>

        <div class="modal-skills" v-if="hasSkills">
            <h4>Skills & Technologies</h4>

            <div class="tags-list mb-1">
                <template v-for="skill in project['tags']" :key="skill">
                    <div class="badge">{{ skill }}</div>
                </template>
            </div>

            <div class="skills-list">
                <template v-for="skill in project['skills']" :key="skill">
                    <div class="badge">{{ skill }}</div>
                </template>
            </div>
        </div>

        <div class="modal-links" v-if="hasLinks">
            <h4>Links</h4>

            <div class="links-list">
                <template v-for="link in normalizedLinks" :key="link['icon']">
                    <component :is="link['tag']" class="modal-link" :class="link['class']" :title="link['title']" v-bind="link['attrs']">
                        <Icon :name="link['icon']" />
                    </component>
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
    titleId: {
        type: String,
        default: undefined,
    },
})

const hasSkills = computed(function () {
    const skills = props['project']['skills']
    return Boolean(skills && skills.length)
})

const hasLinks = computed(function () {
    const links = props['project']['links']
    return Boolean(links && links.length)
})

// Resolve each link's tag, tooltip, and anchor attributes ahead of time so the
// template loop is branch-free
const normalizedLinks = computed(function () {
    const links = props['project']['links'] || []

    return links.map(function (link) {
        const hasUrl = Boolean(link['link'])

        return {
            icon: link['icon'],
            title: link['title'] || (hasUrl ? 'View project' : 'Not published'),
            tag: hasUrl ? 'a' : 'span',
            class: hasUrl ? '' : 'disabled',
            attrs: hasUrl ? { href: link['link'], target: '_blank', rel: 'noopener noreferrer' } : {},
        }
    })
})
</script>

<style scoped lang="scss">
.modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h4 {
        @apply font-medium m-0;
        font-size: 0.875rem;
        color: var(--color-background-dark);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.modal-title {
    @apply font-semibold m-0;
    font-size: 1.5rem;
    color: var(--color-background-dark);
}

.modal-year {
    @apply font-medium;
    font-size: 0.875rem;
    color: var(--color-primary);
    background: rgba(var(--color-primary-rgb), 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
}

.modal-description {
    p {
        @apply text-justify leading-relaxed m-0;
        font-size: 0.9rem;
        color: var(--color-background-7);
    }
}

.modal-skills {
    @apply mt-1;

    .tags-list,
    .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tags-list .badge {
        background-color: var(--color-primary);
    }

    .skills-list .badge {
        background-color: var(--color-inverse);
    }
}

.modal-links {
    .links-list {
        @apply p-0 m-0 -mt-1;

        display: flex;
        gap: 1rem;

        .modal-link {
            font-size: 2rem;
            color: var(--color-background-7);
            transition: all 0.2s ease;

            &:hover:not(.disabled) {
                color: var(--color-primary);
                transform: translateY(-2px);
            }

            &.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }
}
</style>
