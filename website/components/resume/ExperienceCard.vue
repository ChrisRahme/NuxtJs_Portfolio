<template>
  <article class="card exp-card" :style="{ '--theme': item['color'] || 'var(--green)' }">
    <header class="exp-head">
      <div class="exp-main">
        <p class="eyebrow exp-dates">
          <ExperienceDates :item="item" />
        </p>

        <h3 class="exp-title">{{ item['title'] }}</h3>

        <p class="exp-company">
          <component :is="companyLink.tag" v-bind="companyLink.attrs" class="company-name">
            <span>{{ item['company'] }}</span>
            <Icon v-if="companyLink.isLink" name="solar:link-bold" />
          </component>

          <span v-if="item['type']" class="exp-type">{{ item['type'] }}</span>
        </p>
      </div>

      <component :is="companyLink.tag" v-bind="companyLink.attrs" v-if="hasImage(item['logo'])" class="exp-logo">
        <NuxtImg
          provider="sanity"
          :src="imageRef(item['logo'])"
          :alt="item['logo']?.['alt'] || `${item['company']} logo`"
          width="56"
          height="56"
          format="webp"
        />
      </component>
    </header>

    <p v-if="item['description']" class="exp-desc">{{ item['description'] }}</p>

    <ExperienceTaskList v-if="item['tasks']?.length" :tasks="item['tasks']" />
  </article>
</template>

<script setup lang="ts">
import type { EXPERIENCE_QUERY_RESULT } from '~~/sanity.types'
import ExperienceDates from './ExperienceDates.vue'
import ExperienceTaskList from './ExperienceTaskList.vue'

const props = defineProps<{
  item: EXPERIENCE_QUERY_RESULT[number]
}>()

const companyLink = computed(function () {
  const isLink = Boolean(props['item']['link'])

  return {
    isLink,
    tag: isLink ? 'a' : 'span',
    attrs: isLink
      ? {
          href: props['item']['link'],
          target: '_blank',
          rel: 'noopener noreferrer',
          title: 'Visit website',
        }
      : {},
  }
})
</script>

<style lang="scss" scoped>
.exp-card {
  padding: clamp(1.25rem, 3vw, 2rem);
  box-shadow:
    inset 4px 0 0 var(--theme),
    var(--shadow-card);

  .exp-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .exp-main {
    min-width: 0;
  }

  .exp-dates {
    margin: 0 0 0.5rem;
    color: var(--green-ink);
  }

  .exp-title {
    margin: 0 0 0.25rem;
    font-family: var(--font-body);
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
  }

  .exp-company {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.75rem;
    margin: 0;
    font-size: 0.9375rem;

    .company-name {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--purple);
      font-weight: 600;
      text-decoration: none;

      .iconify {
        font-size: 0.8em;
        opacity: 0.7;
        transition: opacity 200ms ease;
      }

      &:hover .iconify {
        opacity: 1;
      }
    }

    .exp-type {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.06em;
      color: var(--ink-2);
    }
  }

  .exp-logo {
    flex: none;
    display: block;
    border-radius: 0.75rem;
    line-height: 0;

    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 0.75rem;
      object-fit: contain;
    }
  }

  .exp-desc {
    margin: 0;
    color: var(--ink);
  }
}
</style>
