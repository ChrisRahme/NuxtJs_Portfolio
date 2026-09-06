<template>
  <div id="default-layout">
    <Header />

    <main id="main">
      <slot></slot>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
const { locale } = useLocale()

useHead({
  htmlAttrs: { lang: locale },
})
</script>

<style scoped lang="scss">
#default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100svh;
  background-color: var(--paper);

  & > main {
    flex: 1;
  }
}
</style>
