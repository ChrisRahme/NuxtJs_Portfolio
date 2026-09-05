<template>
  <div class="tasks">
    <div v-for="task in tasks" :key="task['_key']" class="task">
      <h4 v-if="task['title']" class="task-title">{{ task['title'] }}</h4>

      <p v-if="task['title'] && lines(task).length < 2" class="task-single"><RichText :value="lines(task)" inline /></p>

      <ul v-else class="task-list">
        <li v-for="line in lines(task)" :key="line['_key']"><RichText :value="[line]" inline /></li>
      </ul>

      <ul v-if="task['skills']?.length" class="task-skills">
        <li
          v-for="skill in task['skills']"
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
</template>

<script setup lang="ts">
import type { EXPERIENCE_QUERY_RESULT } from '~~/sanity.types'

type Task = NonNullable<EXPERIENCE_QUERY_RESULT[number]['tasks']>[number]
type Skill = NonNullable<Task['skills']>[number]

defineProps<{
  tasks: Task[]
}>()

// One rich-text block per bullet point
function lines(task: Task) {
  return task['lines'] || []
}

// Skills without an icon or SVG fall back to a name badge
function hasGlyph(skill: Skill) {
  return Boolean(skill['icon'] || skill['svg'])
}
</script>

<style lang="scss" scoped>
.tasks {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.25rem;

  .task-title {
    margin: 0 0 0.35rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--green-ink);
  }

  .task-single {
    margin: 0;
  }

  .task-list {
    margin: 0;
    padding-left: 1.25rem;
    list-style: disc outside; // Tailwind's reset removes list markers

    li {
      margin: 0.2rem 0;
      padding-left: 0.25rem;

      &::marker {
        color: var(--green);
      }
    }
  }

  .task-skills {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem 0.65rem;
    margin: 0.75rem 0 0;
    padding: 0;
    list-style: none;
  }

  .skill {
    display: grid;
    place-items: center;
    width: 1.6rem;
    height: 1.6rem;
    color: var(--brand, var(--ink-2));
    font-size: 1.45rem;
    line-height: 0;

    .skill-svg {
      display: block;
      width: 1.35rem;
      height: 1.35rem;

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
}
</style>
