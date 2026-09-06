<template>
  <span class="dates">{{ formatMonth(item['start']) }} – {{ formatMonth(item['end']) }}</span>
</template>

<script setup>
const { formatMonth } = useDates()

defineProps({
  // `start` / `end` as 'YYYY-MM'; `end: null` while the role is ongoing
  item: {
    type: Object,
    required: true,
  },
})
</script>
