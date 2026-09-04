<template>
  <div class="tasks">
    <div v-for="task in tasks" :key="task['_key']" class="task">
      <h4 v-if="task['title']" class="task-title">{{ task['title'] }}</h4>

      <p v-if="task['title'] && lines(task).length < 2" class="task-single"><RichText :value="lines(task)" inline /></p>

      <ul v-else class="task-list">
        <li v-for="line in lines(task)" :key="line['_key']"><RichText :value="[line]" inline /></li>
      </ul>

      <div v-if="task['skills']?.length" class="task-skills">
        <span v-for="skill in task['skills']" :key="skill['_id']" class="badge">{{ skill['name'] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EXPERIENCE_QUERY_RESULT } from '~~/sanity.types'

type Task = NonNullable<EXPERIENCE_QUERY_RESULT[number]['tasks']>[number]

defineProps<{
  tasks: Task[]
}>()

// One rich-text block per bullet point
function lines(task: Task) {
  return task['lines'] || []
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
    gap: 0.35rem;
    margin-top: 0.75rem;
  }
}
</style>
