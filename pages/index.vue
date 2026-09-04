<template>
  <div id="home">
    <HeroSection />
    <WorkSection />
    <CareerSection />
    <AboutSection />
  </div>
</template>

<script setup>
import HeroSection from '~/components/home/HeroSection.vue'
import WorkSection from '~/components/home/WorkSection.vue'
import CareerSection from '~/components/home/CareerSection.vue'
import AboutSection from '~/components/home/AboutSection.vue'

useHead({
  title: 'Chris Rahmé | Home',
  meta: [
    { name: 'description', content: 'Chris Rahmé - Full-Stack & AI Engineer' },
    { property: 'og:title', content: 'Chris Rahmé | Home' },
    { property: 'og:description', content: 'Chris Rahmé - Full-Stack & AI Engineer' },
    { property: 'og:url', content: 'https://chrisrahme.dev' },
    { name: 'twitter:title', content: 'Chris Rahmé | Home' },
    { name: 'twitter:description', content: 'Chris Rahmé - Full-Stack & AI Engineer' },
  ],
})

// Lifecycle
onMounted(function () {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
