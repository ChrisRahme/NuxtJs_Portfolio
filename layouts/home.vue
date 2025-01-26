<template>
    <div id="home-layout">
        <Header />

        <main>
            <div id="main">
                <slot></slot>
            </div>
        </main>

        <Footer />
    </div>
</template>

<script setup></script>

<style scoped lang="scss">
    #home-layout {
        background-color: var(--color-background-light);
    }
</style>
