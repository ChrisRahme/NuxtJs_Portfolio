<template>
    <div>
        <h1>Blog</h1>
        <p>Coming soon!</p>
    </div>
</template>

<script setup>
useHead({
    title: 'Blog | Chris Rahmé',
    meta: [
        { name: 'description', content: 'Blog posts by Chris Rahmé — coming soon.' },
        { property: 'og:title', content: 'Blog | Chris Rahmé' },
        { property: 'og:description', content: 'Blog posts by Chris Rahmé — coming soon.' },
        { property: 'og:url', content: 'https://chrisrahme.dev/blog' },
        { name: 'twitter:title', content: 'Blog | Chris Rahmé' },
        { name: 'twitter:description', content: 'Blog posts by Chris Rahmé — coming soon.' },
    ],
})

// Lifecycle
onMounted(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped></style>
