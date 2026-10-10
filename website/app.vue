<template>
  <NuxtLayout>
    <NuxtPage :key="locale" />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Remount the page when the language changes.
const { locale } = useLocale()
</script>
