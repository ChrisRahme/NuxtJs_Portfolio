<template>
    <div id="default-layout">
        <Header />

        <main class="container mx-auto">
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

        .container {
            padding: var(--content-py) var(--content-px);
        }
    }
</style>
