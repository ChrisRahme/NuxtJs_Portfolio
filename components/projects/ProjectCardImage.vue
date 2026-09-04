<template>
  <div class="project-image">
    <NuxtImg :src="src" :alt="alt" width="640" height="360" loading="lazy" format="webp" />
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.project-image {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--paper-2);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
