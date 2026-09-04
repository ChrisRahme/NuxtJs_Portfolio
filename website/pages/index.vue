<template>
  <div id="home">
    <HeroSection />
    <WorkSection />
    <CareerSection />
    <AboutSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'
import WorkSection from '~/components/home/WorkSection.vue'
import CareerSection from '~/components/home/CareerSection.vue'
import AboutSection from '~/components/home/AboutSection.vue'

const { settings, query, siteTitle, siteDescription } = useSiteSettings()
await query

usePageMeta({
  title: computed(function () {
    return `${siteTitle.value} | Home`
  }),
  description: computed(function () {
    return settings.value?.home?.description || siteDescription.value
  }),
  path: '/',
})

// Lifecycle
onMounted(function () {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
