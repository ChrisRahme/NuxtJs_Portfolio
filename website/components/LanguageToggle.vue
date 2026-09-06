<template>
  <div class="lang-toggle" role="group" :aria-label="t('nav.language')">
    <button
      v-for="option in locales"
      :key="option['id']"
      type="button"
      class="lang-option"
      :class="{ active: locale === option['id'] }"
      :aria-pressed="locale === option['id']"
      :title="option['title']"
      @click="setLocale(option['id'])"
    >
      {{ option['label'] }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useLocale()
const { t } = useTranslation()
</script>

<style scoped lang="scss">
.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.15rem;
  border: 1px solid var(--sky-line);
  border-radius: var(--r-pill);
  background: rgb(10, 14, 42, 0.4);

  .lang-option {
    appearance: none;
    margin: 0;
    padding: 0.25rem 0.5rem;
    border: 0;
    border-radius: var(--r-pill);
    background: none;
    font: inherit;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--star-dim);
    cursor: pointer;
    transition:
      color 200ms ease,
      background-color 200ms ease;

    &:hover {
      color: var(--star);
    }

    &.active {
      color: var(--green-light);
      background: rgb(96, 192, 96, 0.14);
    }

    &:focus-visible {
      outline-color: var(--green-light);
    }
  }
}
</style>
