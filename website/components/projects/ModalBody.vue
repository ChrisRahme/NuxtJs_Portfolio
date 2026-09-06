<template>
  <article class="modal-body">
    <header class="modal-header">
      <ProjectMeta :project="project" />

      <h2 :id="titleId" class="modal-title">{{ project['name'] }}</h2>
    </header>

    <div v-if="paragraphs.length" class="modal-story">
      <p v-for="block in paragraphs" :key="block['_key']"><RichText :value="[block]" inline /></p>
    </div>

    <section v-if="hasSkills" class="modal-section">
      <p class="eyebrow modal-label">{{ t('projects.builtWith') }}</p>

      <ul class="skills">
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
    </section>

    <div v-if="published.length" class="modal-actions">
      <a
        v-for="(link, index) in published"
        :key="link['key']"
        :class="index === 0 ? 'btn' : 'btn-ghost'"
        class="modal-link"
        :href="link['link']"
        :title="link['title']"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon :name="link['icon']" />
        <span>{{ link['label'] }}</span>
        <Icon name="mdi:arrow-top-right" class="modal-link-ext" aria-hidden="true" />
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PROJECTS_QUERY_RESULT } from '~~/sanity.types'
import ProjectMeta from './ProjectMeta.vue'

// Props
const props = defineProps<{
  project: PROJECTS_QUERY_RESULT[number]
  titleId?: string
}>()

const { t } = useTranslation()

// Every description block renders as a normal paragraph
const paragraphs = computed(function () {
  return props['project']['description'] || []
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

const LINK_LABELS: Record<string, string> = {
  'mdi:github': 'projects.linkSource',
  'mdi:web': 'projects.linkOpen',
  'mdi:youtube': 'projects.linkVideo',
}

const published = computed(function () {
  const links = props['project']['links'] || []

  return links
    .filter(function (link) {
      return Boolean(link['url'])
    })
    .map(function (link) {
      const icon = link['icon'] || 'mdi:web'
      return {
        key: link['_key'],
        icon,
        link: link['url'] || '',
        label: link['label'] || t(LINK_LABELS[icon] || 'projects.linkOpen'),
        title: t('projects.linkNewTab'),
      }
    })
})
</script>

<style scoped lang="scss">
.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: clamp(1.25rem, 3vw, 2.25rem);
  animation: body-in 220ms ease both;
}

@keyframes body-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.modal-header {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.modal-title {
  margin: 0;
  font-size: clamp(1.375rem, 1.1rem + 1vw, 1.75rem);
  font-weight: 500;
  color: var(--ink);
}

.modal-story {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  p {
    margin: 0;
    line-height: 1.65;
    color: var(--ink);
  }
}

.modal-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.modal-label {
  margin: 0;
  color: var(--ink-2);
}

.skills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill {
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  color: var(--brand, var(--ink-2));
  font-size: 1.6rem;
  line-height: 0;

  .skill-svg {
    display: block;
    width: 1.5rem;
    height: 1.5rem;

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

.modal-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.25rem;
}

.modal-link {
  padding: 0.55rem 1rem;
  font-size: 0.875rem;

  .iconify {
    font-size: 1.2rem;
  }

  .modal-link-ext {
    margin-left: -0.15rem;
    font-size: 0.95rem;
    opacity: 0.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-body {
    animation: none;
  }
}
</style>
