<template>
  <div class="tasks">
    <div v-for="task in tasks" :key="task['title'] || task['text'][0]" class="task">
      <h4 v-if="task['title']" class="task-title">{{ task['title'] }}</h4>

      <p v-if="task['title'] && task['text'].length < 2" class="task-single" v-html="task['text'][0]"></p>

      <ul v-else class="task-list">
        <li v-for="line in task['text']" :key="line" v-html="line"></li>
      </ul>

      <div v-if="task['skills']" class="task-skills">
        <span v-for="skill in task['skills']" :key="skill" class="badge">{{ skill }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})
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
