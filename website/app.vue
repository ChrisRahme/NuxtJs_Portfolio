<template>
  <NuxtLayout>
    <NuxtPage :key="locale" />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Remount the page when the language changes.The header, footer, and chrome stay mounted and switch via t().
const { locale } = useLocale()
</script>
