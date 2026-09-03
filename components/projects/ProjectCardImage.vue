<template>
    <div class="project-image">
        <NuxtImg :src="src" :alt="alt" class="rounded shadow-sm" width="500" height="280" loading="lazy" format="webp" />
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
@import '../../assets/css/tailwind.css';

.project-image {
    img {
        @apply transition-100 hover:shadow-md;
        width: 100%;
        min-height: 200px;
        max-height: 200px;
        object-fit: cover;
    }
}
</style>
