<template>
  <article class="project-card card" :class="{ mirror }">
    <div class="project-inner">
      <ProjectCardImage v-if="previewImage" :image="previewImage" :alt="previewImage['alt'] || project['name'] || ''" />

      <div class="project-body">
        <ProjectMeta :project="project" />

        <h3 class="project-title">{{ project['name'] }}</h3>

        <p v-if="project['summary']" class="project-summary">{{ project['summary'] }}</p>

        <div v-if="hasSkills" class="project-skills">
          <span v-for="skill in project['skills']" :key="skill['_id']" class="badge">{{ skill['name'] }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PROJECTS_QUERY_RESULT } from '~~/sanity.types'
import ProjectCardImage from './ProjectCardImage.vue'
import ProjectMeta from './ProjectMeta.vue'

// Props
const props = withDefaults(
  defineProps<{
    project: PROJECTS_QUERY_RESULT[number]
    mirror?: boolean
  }>(),
  { mirror: false },
)

const previewImage = computed(function () {
  return (props['project']['images'] || []).find(hasImage) || null
})

const hasSkills = computed(function () {
  const skills = props['project']['skills']
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
