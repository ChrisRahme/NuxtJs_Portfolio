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
        <QuoteBar />
        <AboutSection />
    </div>
</template>

<script setup>
import HeroSection from '~/components/home/HeroSection.vue'
import QuoteBar from '~/components/home/QuoteBar.vue'
import AboutSection from '~/components/home/AboutSection.vue'

definePageMeta({
    layout: 'home', // No need to mention if default
})

// Lifecycle
onMounted(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
