<template>
  <div>
    <!-- Under construction -->
    <div class="w-100 rounded bg-[#E0C040]">
      <div class="w-100 px-8 py-2">
        <p class="m-0 p-0 text-white">⚠️ Page is still under construction.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { query, siteTitle } = useSiteSettings()
await query

usePageMeta({
  title: computed(function () {
    return `Contact | ${siteTitle.value}`
  }),
  description: computed(function () {
    return `Contact ${siteTitle.value}.`
  }),
  path: '/contact',
})

// Lifecycle
onMounted(function () {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
