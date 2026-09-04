<template>
  <section v-if="current" id="career">
    <div class="wrap">
      <div class="section-head reveal">
        <h2>Career</h2>
        <p class="eyebrow">{{ experienceLabel }}</p>
      </div>

      <div class="now reveal">
        <p class="now-line">
          <span class="eyebrow now-label">Now</span>
          <span class="now-title">{{ current['title'] }}</span>
          <span class="now-company">at {{ current['company'] }}</span>
          <span class="now-since">since {{ formatMonth(current['start']) }}</span>
        </p>

        <NuxtLink to="/resume" class="btn-ghost">
          <span>Full resume</span>
          <Icon name="mdi:arrow-right" aria-hidden="true" />
        </NuxtLink>
      </div>

      <ExperienceTrack class="reveal" :items="careerRoles" :selected-index="careerRoles.length - 1" :interactive="false" :today="today" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { EXPERIENCE_QUERY_RESULT } from '~~/sanity.types'
import ExperienceTrack from '~/components/resume/ExperienceTrack.vue'
import { formatMonth, formatYears, yearsBetween } from '~/utils/dates'

const { data: experience } = await useSanityQuery<EXPERIENCE_QUERY_RESULT>(EXPERIENCE_QUERY)

const today = useTodayMonth()

const careerRoles = computed(function () {
  return (experience.value || []).filter(function (item) {
    return item['career']
  })
})

const current = computed(function () {
  return careerRoles.value[careerRoles.value.length - 1] || null
})

const experienceLabel = computed(function () {
  const first = careerRoles.value[0]
  return first ? `${formatYears(yearsBetween(first['start'], today.value))} of experience` : ''
})
</script>

<style scoped lang="scss">
#career {
  padding-block: var(--space-section);
  background-color: var(--paper-2);
  color: var(--ink);

  .now {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem 2rem;
    margin-bottom: 2rem;

    .btn-ghost .iconify {
      font-size: 1.1rem;
    }
  }

  .now-line {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem 0.6rem;
    margin: 0;
    line-height: 1.3;
  }

  .now-label {
    margin-right: 0.4rem;
    color: var(--green-ink);
  }

  .now-title {
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .now-company {
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--purple);
  }

  .now-since {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    color: var(--ink-2);
  }
}
</style>
