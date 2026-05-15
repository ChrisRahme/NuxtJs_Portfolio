<template>
    <div>
        <!-- Under construction -->
        <div class="bg-[#E0C040] w-100 rounded">
            <div class="w-100 px-8 py-2">
                <p class="m-0 p-0 text-white">⚠️ Page is still under construction.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: 'Contact | Chris Rahmé',
    meta: [
        { name: 'description', content: 'Contact Chris Rahmé.' },
        { property: 'og:title', content: 'Contact | Chris Rahmé' },
        { property: 'og:description', content: 'Contact Chris Rahmé.' },
        { property: 'og:url', content: 'https://chrisrahme.dev/contact' },
        { name: 'twitter:title', content: 'Contact | Chris Rahmé' },
        { name: 'twitter:description', content: 'Contact Chris Rahmé.' },
    ],
})

// Lifecycle
onMounted(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped></style>
