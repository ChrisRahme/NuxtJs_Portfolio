<template>
    <article class="project-card card" :class="{ mirror }">
        <div class="project-inner">
            <ProjectCardImage :src="previewImage" :alt="project['name']" v-if="previewImage" />

            <div class="project-body">
                <p class="eyebrow project-meta">
                    <b class="featured-mark" v-if="project['featured']" title="Featured project">
                        <Icon name="mdi:star-four-points" aria-hidden="true" />
                        <span class="sr-only">Featured</span>
                    </b>
                    <span>{{ project['year'] }}</span>
                    <span v-for="tag in project['tags']" :key="tag">{{ tag }}</span>
                </p>

                <h3 class="project-title">{{ project['name'] }}</h3>

                <p class="project-summary" v-if="project['summary']">{{ project['summary'] }}</p>

                <div class="project-skills" v-if="hasSkills">
                    <span class="badge" v-for="skill in project['skills']" :key="skill">{{ skill }}</span>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
import ProjectCardImage from './ProjectCardImage.vue'

// Props
const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
    mirror: {
        type: Boolean,
        default: false,
    },
})

const previewImage = computed(function () {
    const images = props['project'] && props['project']['images']
    return images && images.length ? images[0] : null
})

const hasSkills = computed(function () {
    const skills = props['project'] && props['project']['skills']
    return Boolean(skills && skills.length)
})
</script>

<style scoped lang="scss">
.project-card {
    container-type: inline-size;
    height: 100%;
    overflow: hidden;
    transition:
        transform 200ms ease,
        box-shadow 200ms ease,
        border-color 200ms ease;

    // A parent can also set --card-direction (it inherits) to mirror a card it lays out full width
    &.mirror {
        --card-direction: row-reverse;
    }

    .project-inner {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .project-body {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 0.5rem;
        padding: 1.125rem 1.25rem 1.25rem;
    }

    .project-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.25rem 0.75rem;
        margin: 0;
        color: var(--ink-2);

        span + span::before {
            content: '·';
            margin-right: 0.75rem;
            color: var(--green);
        }

        .featured-mark {
            display: inline-flex;
            color: var(--green-ink);
            font-size: 0.9rem;
            line-height: 1;
        }
    }

    .project-title {
        margin: 0;
        font-family: var(--font-body);
        font-size: 1.0625rem;
        font-weight: 600;
        letter-spacing: -0.01em;
        line-height: 1.3;
    }

    .project-summary {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.55;
        color: var(--ink-2);
    }

    .project-skills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
        margin-top: auto;
        padding-top: 0.5rem;
    }

    :deep(.project-image img) {
        transition: transform 500ms ease;
    }

    &:hover {
        transform: translateY(-3px);
        border-color: var(--green);
        box-shadow: var(--shadow-card-hover);

        :deep(.project-image img) {
            transform: scale(1.03);
        }
    }

    /* Wide card: image beside the text once the card has the room */
    @container (min-width: 40rem) {
        .project-inner {
            flex-direction: var(--card-direction, row);
        }

        :deep(.project-image) {
            flex: 0 0 56%;
            aspect-ratio: 16 / 10;
        }

        .project-body {
            justify-content: center;
            gap: 0.75rem;
            padding: clamp(1.5rem, 4cqw, 2.5rem);
        }

        .project-title {
            font-size: clamp(1.25rem, 1rem + 1cqw, 1.625rem);
        }

        .project-summary {
            font-size: 1rem;
            line-height: 1.6;
        }

        .project-skills {
            margin-top: 0.25rem;
        }
    }
}

@media (prefers-reduced-motion: reduce) {
    .project-card,
    .project-card :deep(.project-image img) {
        transition: none;
    }
}
</style>
