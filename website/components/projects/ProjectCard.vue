<template>
  <article class="project-card card" :class="{ mirror }">
    <div class="project-inner">
      <ProjectCardImage v-if="previewImage" :image="previewImage" :alt="previewImage['alt'] || project['name'] || ''" />

      <div class="project-body">
        <ProjectMeta :project="project" />

        <h3 class="project-title">{{ project['name'] }}</h3>

        <p v-if="project['summary']" class="project-summary">{{ project['summary'] }}</p>

        <ul v-if="hasSkills" class="project-skills">
          <li
            v-for="skill in project['skills']"
            :key="skill['_id']"
            class="skill"
            :class="{ 'skill-badge': !hasGlyph(skill) }"
            :style="{ '--brand': skill['color'] || undefined }"
            :title="skill['name'] || undefined"
          >
            <Icon v-if="skill['icon']" :name="skill['icon']" aria-hidden="true" />
            <span v-else-if="skill['svg']" class="skill-svg" aria-hidden="true" v-html="skill['svg']"></span>
            <span :class="hasGlyph(skill) ? 'sr-only' : 'badge'">{{ skill['name'] }}</span>
          </li>
        </ul>
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

type Skill = NonNullable<PROJECTS_QUERY_RESULT[number]['skills']>[number]

const hasSkills = computed(function () {
  const skills = props['project']['skills']
  return Boolean(skills && skills.length)
})

// Skills without an icon or SVG fall back to a name badge
function hasGlyph(skill: Skill) {
  return Boolean(skill['icon'] || skill['svg'])
}
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
    align-items: center;
    gap: 0.4rem 0.6rem;
    margin: auto 0 0;
    padding: 0.5rem 0 0;
    list-style: none;
  }

  .skill {
    display: grid;
    place-items: center;
    width: 1.5rem;
    height: 1.5rem;
    color: var(--brand, var(--ink-2));
    font-size: 1.4rem;
    line-height: 0;

    .skill-svg {
      display: block;
      width: 1.3rem;
      height: 1.3rem;

      :deep(svg) {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    &.skill-badge {
      width: auto;
      height: auto;
      font-size: inherit;
      line-height: inherit;
    }
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
