<template>
    <Head>
        <Title>Chris Rahmé | Home</Title>
        <Meta name="description" content="Chris Rahmé - Full-Stack & AI Engineer" />
        <Meta property="og:title" content="Chris Rahmé | Home" />
        <Meta property="og:description" content="Chris Rahmé - Full-Stack & AI Engineer" />
        <Meta property="og:url" content="https://chrisrahme.dev" />
        <Meta name="twitter:title" content="Chris Rahmé | Home" />
        <Meta name="twitter:description" content="Chris Rahmé - Full-Stack & AI Engineer" />
    </Head>

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

// Lifecycle
onMounted(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
