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

      <div v-if="currentAbout" class="about-body reveal">
        <div v-if="firstParagraph.length" class="about-text">
          <p>
            <span v-if="greeting" class="text-primary">{{ greeting }}</span>
            {{ ' ' }}
            <RichText :value="firstParagraph" inline />
          </p>
          <RichText :value="otherParagraphs" />

          <NuxtLink v-if="currentAbout['button']?.['link']" :to="currentAbout['button']['link'] || ''" class="btn">
            {{ currentAbout['button']['text'] }}
          </NuxtLink>
        </div>

        <figure
          v-if="hasImage(currentAbout['image'])"
          class="polaroid"
          :style="{
            '--rotation': state['aboutImageRotation'][0],
            '--rotation-hover': state['aboutImageRotation'][1],
          }"
        >
          <NuxtImg
            provider="sanity"
            :src="imageRef(currentAbout['image'])"
            :alt="currentAbout['image']?.['alt'] || currentAbout['caption'] || ''"
            width="640"
            height="480"
            format="webp"
          />
          <figcaption>{{ currentAbout['caption'] }}</figcaption>
        </figure>
      </div>

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

// The greeting shares the first paragraph; the others follow as their own paragraphs
const firstParagraph = computed(function () {
  return (currentAbout.value?.text || []).slice(0, 1)
})

const otherParagraphs = computed(function () {
  return (currentAbout.value?.text || []).slice(1)
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

  .about-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2.5rem;
    align-items: start;
  }

  .about-text {
    max-width: 42rem;
    line-height: 1.7;

    p {
      margin: 0 0 1.5rem;
    }
  }

  .polaroid {
    margin: 0;
    justify-self: center;
    width: 100%;
    max-width: 26rem;

    img,
    figcaption {
      display: block;
      transform: rotateZ(calc(1deg * var(--rotation)));
      transition: all 300ms ease;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: var(--r-card);
      box-shadow: var(--shadow-card);
      transition: all 500ms ease;
    }

    figcaption {
      margin: 0.6rem 1rem 0 0;
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      text-align: right;
      color: var(--ink-2);
    }

    &:hover {
      img {
        transform: rotateZ(calc(1deg * var(--rotation-hover)));
        box-shadow: var(--shadow-card-hover);
      }

      figcaption {
        opacity: 0;
      }
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

  @container about (min-width: 56rem) {
    .about-body {
      grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
      gap: 4rem;
    }
  }
}
</style>
