<template>
  <div class="education">
    <article v-for="item in education || []" :key="item['_id']" class="card edu-card" :style="{ '--theme': item['color'] || 'var(--green)' }">
      <span class="edu-icon" aria-hidden="true">
        <Icon v-if="item['icon']" :name="item['icon']" />
      </span>

      <div class="edu-text">
        <p class="eyebrow edu-dates">{{ item['start'] }} — {{ item['end'] }}</p>

        <h3 class="edu-title">{{ item['title'] }}</h3>

        <p class="edu-institution">
          <a v-if="item['link']" :href="item['link']" target="_blank" rel="noopener noreferrer" title="Visit website">
            <span>{{ item['institution'] }}</span>
            <Icon name="solar:link-bold" />
          </a>
          <span v-else>{{ item['institution'] }}</span>
        </p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { EDUCATION_QUERY_RESULT } from '~~/sanity.types'

const { data: education } = await useSanityQuery<EDUCATION_QUERY_RESULT>(EDUCATION_QUERY)
</script>

<style lang="scss" scoped>
.education {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1.25rem;

  // Phones: single column. Reverse to newest first (on top); keep desktop order.
  @media (width < 34rem) {
    display: flex;
    flex-direction: column-reverse;
  }

  .edu-card {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    transition:
      transform 200ms ease,
      box-shadow 200ms ease,
      border-color 200ms ease;

    &:hover {
      transform: translateY(-3px);
      border-color: var(--theme);
      box-shadow: var(--shadow-card-hover);
    }
  }

  .edu-icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 0.875rem;
    background: color-mix(in srgb, var(--theme) 16%, white);
    color: var(--theme);
    font-size: 1.5rem;
  }

  .edu-text {
    min-width: 0;
  }

  .edu-dates {
    margin: 0 0 0.4rem;
    color: var(--ink-2);
  }

  .edu-title {
    margin: 0 0 0.35rem;
    font-family: var(--font-body);
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  .edu-institution {
    margin: 0;
    font-size: 0.9375rem;

    a,
    span {
      color: var(--purple);
      font-weight: 600;
      text-decoration: none;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;

      .iconify {
        font-size: 0.8em;
        opacity: 0.7;
      }

      &:hover .iconify {
        opacity: 1;
      }
    }
  }
}
</style>
