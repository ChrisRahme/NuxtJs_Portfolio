<template>
    <div id="default-layout">
        <Header />

        <main class="container mx-auto py-4">
            <div id="main">
                <slot></slot>
            </div>
        </main>

        <Footer />
    </div>
</template>

<script setup>
// import Navbar from '~/components/Navbar.vue'
</script>

<style scoped lang="scss">
#default-layout {
    background-color: var(--color-background-light);

    & > main {
        @media (width < theme('screens.lg')) {
            padding-right: 1rem;
            padding-left: 1rem;
        }
    }
}
</style>
