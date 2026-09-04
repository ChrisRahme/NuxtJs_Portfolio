<template>
  <section id="about">
    <div class="wrap about-inner">
      <div class="section-head reveal">
        <h2>About me</h2>
      </div>

      <div class="facets reveal" role="tablist" aria-label="Abouts">
        <button
          v-for="(about, index) in list"
          :key="about['_id']"
          type="button"
          class="chip facet"
          :class="{ active: state['aboutIndex'] === index }"
          role="tab"
          :aria-selected="state['aboutIndex'] === index"
          @click="changeAbout(index)"
        >
          <span class="emoji" aria-hidden="true">{{ about['emoji'] }}</span>
          <span class="label">{{ about['title'] }}</span>
        </button>
      </div>

      <AboutBody v-if="currentAbout" :about="currentAbout" :greeting="greeting" :rotation="state['aboutImageRotation']" />

      <!-- Preload images -->
      <div class="preload" aria-hidden="true">
        <NuxtImg
          v-for="image in preloadImages"
          :key="imageRef(image)"
          provider="sanity"
          :src="imageRef(image)"
          alt=""
          width="640"
          height="480"
          format="webp"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ABOUTS_QUERY_RESULT } from '~~/sanity.types'
import AboutBody from './AboutBody.vue'

const { data: abouts } = await useSanityQuery<ABOUTS_QUERY_RESULT>(ABOUTS_QUERY)
const { settings, query } = useSiteSettings()
await query

const list = computed(function () {
  return abouts.value || []
})

const greeting = computed(function () {
  return settings.value?.home?.aboutGreeting || ''
})

// State
const state = reactive({
  aboutIndex: 0,
  aboutImageRotation: [2, 3],
})

const currentAbout = computed(function () {
  return list.value[state['aboutIndex']] || null
})

const preloadImages = computed(function () {
  return list.value
    .map(function (about) {
      return about['image']
    })
    .filter(hasImage)
})

// Methods
function changeAbout(index: number) {
  const r1 = 3 * (Math.random() - 0.5)
  const r2 = r1 + (Math.random() < 0.5 ? -1 : +1) * (Math.random() + 1)

  state['aboutIndex'] = index
  state['aboutImageRotation'] = [r1, r2]
}
</script>

<style scoped lang="scss">
#about {
  container-type: inline-size;
  container-name: about;
  padding-block: var(--space-section);
  background-color: var(--paper);
  color: var(--ink);

  .facets {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
  }

  .facet {
    padding: 0.45rem 0.9rem 0.45rem 0.7rem;
    font-size: 0.75rem;
    cursor: pointer;
    transition:
      border-color 200ms ease,
      background-color 200ms ease,
      color 200ms ease;

    .emoji {
      font-size: 1.1rem;
      line-height: 1;
    }

    &:hover {
      border-color: var(--green);
      color: var(--green-ink);
    }

    &.active {
      border-color: var(--green);
      background: var(--green-soft);
      color: var(--green-ink);
    }
  }

  .preload {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }
}
</style>
