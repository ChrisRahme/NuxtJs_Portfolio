<template>
  <article class="modal-body">
    <header class="modal-header">
      <p class="eyebrow modal-meta">
        <b v-if="project['featured']" class="featured-mark" title="Featured project">
          <Icon name="mdi:star-four-points" aria-hidden="true" />
          <span class="sr-only">Featured</span>
        </b>
        <span>{{ project['year'] }}</span>
        <span v-for="tag in project['tags']" :key="tag">{{ tag }}</span>
      </p>

      <h2 :id="titleId" class="modal-title">{{ project['name'] }}</h2>
    </header>

    <div v-if="story" class="modal-story">
      <p v-html="story"></p>
      <p v-for="(note, index) in notes" :key="index" class="modal-note" v-html="note"></p>
    </div>

    <section v-if="hasSkills" class="modal-section">
      <p class="eyebrow modal-label">Built with</p>

      <ul class="chips">
        <li v-for="skill in project['skills']" :key="skill" class="badge">{{ skill }}</li>
      </ul>
    </section>

    <div v-if="published.length" class="modal-actions">
      <a
        v-for="(link, index) in published"
        :key="link['icon']"
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

const descriptionParts = computed(function () {
  const description = props['project']['description'] || ''

  return description
    .split(/<br\s*\/?>/i)
    .map(function (part) {
      return part.trim()
    })
    .filter(Boolean)
})

const story = computed(function () {
  return descriptionParts.value[0] || ''
})

const notes = computed(function () {
  return descriptionParts.value.slice(1)
})

const hasSkills = computed(function () {
  const skills = props['project']['skills']
  return Boolean(skills && skills.length)
})

const LINK_LABELS = {
  'mdi:github': 'Source',
  'mdi:web': 'Open',
  'mdi:youtube': 'Video',
}

const published = computed(function () {
  const links = props['project']['links'] || []

  return links
    .filter(function (link) {
      return Boolean(link['link'])
    })
    .map(function (link) {
      return {
        icon: link['icon'],
        link: link['link'],
        label: link['label'] || LINK_LABELS[link['icon']] || 'Open',
        title: link['title'] || 'Opens in a new tab',
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

.modal-meta {
  display: flex;
  flex-wrap: wrap;
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

  .modal-note {
    padding-left: 0.9rem;
    border-left: 2px solid var(--green);
    font-size: 0.9375rem;
    color: var(--ink-2);
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

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
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
