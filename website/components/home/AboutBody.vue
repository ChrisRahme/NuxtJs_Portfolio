<template>
  <div class="about-body reveal">
    <div v-if="firstParagraph.length" class="about-text">
      <p>
        <span v-if="greeting" class="text-primary">{{ greeting }}</span>
        {{ ' ' }}
        <RichText :value="firstParagraph" inline />
      </p>
      <RichText :value="otherParagraphs" />

      <NuxtLink v-if="about['button']?.['link']" :to="about['button']['link'] || ''" class="btn">
        {{ about['button']['text'] }}
      </NuxtLink>
    </div>

    <figure
      v-if="hasImage(about['image'])"
      class="polaroid"
      :style="{
        '--rotation': rotation[0],
        '--rotation-hover': rotation[1],
      }"
    >
      <NuxtImg
        provider="sanity"
        :src="imageRef(about['image'])"
        :alt="about['image']?.['alt'] || about['caption'] || ''"
        width="640"
        height="480"
        format="webp"
      />
      <figcaption>{{ about['caption'] }}</figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
import type { ABOUTS_QUERY_RESULT } from '~~/sanity.types'

// Props
const props = defineProps<{
  about: ABOUTS_QUERY_RESULT[number]
  greeting?: string
  // Polaroid tilt in degrees: at rest, then on hover
  rotation: number[]
}>()

// The greeting shares the first paragraph; the others follow as their own paragraphs
const firstParagraph = computed(function () {
  return (props['about']['text'] || []).slice(0, 1)
})

const otherParagraphs = computed(function () {
  return (props['about']['text'] || []).slice(1)
})
</script>

<style scoped lang="scss">
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

// Text beside the polaroid once the section (container "about") is wide enough
@container about (min-width: 56rem) {
  .about-body {
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    gap: 4rem;
  }
}
</style>
