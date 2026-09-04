<template>
  <section id="about">
    <div class="wrap about-inner">
      <div class="section-head reveal">
        <h2>About me</h2>
      </div>

      <div class="facets reveal" role="tablist" aria-label="Abouts">
        <button
          v-for="(about, index) in state['abouts']"
          :key="about['title']"
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

      <div v-if="currentAbout['text'] || currentAbout['image']" class="about-body reveal">
        <div v-if="currentAbout['text']" class="about-text">
          <p>
            <span class="text-primary">Hi, I'm Chris.</span>
            <span v-html="currentAbout['text']"></span>
          </p>

          <NuxtLink v-if="currentAbout['button']" :to="currentAbout['button']['link']" class="btn">
            {{ currentAbout['button']['text'] }}
          </NuxtLink>
        </div>

        <figure
          v-if="currentAbout['image']"
          class="polaroid"
          :style="{
            '--rotation': state['aboutImageRotation'][0],
            '--rotation-hover': state['aboutImageRotation'][1],
          }"
        >
          <NuxtImg :src="currentAbout['image']" :alt="currentAbout['label']" width="640" height="480" format="webp" />
          <figcaption>{{ currentAbout['label'] }}</figcaption>
        </figure>
      </div>

      <!-- Preload images -->
      <div class="preload" aria-hidden="true">
        <NuxtImg v-for="about in state['abouts']" :key="about['image']" :src="about['image']" alt="" width="640" height="480" format="webp" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { abouts } from '~/data/abouts'

// State
const state = reactive({
  abouts: abouts.filter(function (about) {
    return about['show']
  }),
  aboutIndex: 0,
  aboutImageRotation: [2, 3],
})

const currentAbout = computed(function () {
  return state['abouts'][state['aboutIndex']] || {}
})

// Methods
function changeAbout(index) {
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
