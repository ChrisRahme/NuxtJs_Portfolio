<template>
  <div class="stage-media">
    <NuxtImg
      v-if="current"
      :key="current['_key']"
      provider="sanity"
      :src="imageRef(current)"
      :alt="current['alt'] || alt"
      class="stage-img"
      :class="{ 'is-loaded': state['loaded'] }"
      decoding="async"
      @load="state['loaded'] = true"
    />

    <template v-if="images.length > 1">
      <button type="button" class="image-nav image-nav-left" title="Previous image" aria-label="Previous image" @click.stop="previousImage">
        <Icon name="mdi:chevron-left" />
      </button>

      <button type="button" class="image-nav image-nav-right" title="Next image" aria-label="Next image" @click.stop="nextImage">
        <Icon name="mdi:chevron-right" />
      </button>

      <div class="image-dots">
        <button
          v-for="(image, index) in images"
          :key="index"
          type="button"
          class="image-dot"
          :class="{ active: state['imageIndex'] === index }"
          :title="`Image ${index + 1} of ${images.length}`"
          :aria-label="`Show image ${index + 1} of ${images.length}`"
          :aria-current="state['imageIndex'] === index ? 'true' : undefined"
          @click.stop="state['imageIndex'] = index"
        ></button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PROJECTS_QUERY_RESULT } from '~~/sanity.types'

type ProjectImage = NonNullable<PROJECTS_QUERY_RESULT[number]['images']>[number]

// Props
const props = withDefaults(
  defineProps<{
    images: ProjectImage[]
    alt?: string
  }>(),
  { alt: '' },
)

const state = reactive({
  imageIndex: 0,
  loaded: false,
})

const current = computed(function () {
  return props['images'][state['imageIndex']] || null
})

// Methods
function nextImage() {
  if (!props['images'].length) {
    return
  }

  state['imageIndex'] = (state['imageIndex'] + 1) % props['images'].length
}

function previousImage() {
  if (!props['images'].length) {
    return
  }

  state['imageIndex'] = (state['imageIndex'] - 1 + props['images'].length) % props['images'].length
}

// Watchers
watch(
  function () {
    return props['images']
  },
  function () {
    state['imageIndex'] = 0
  },
)

// A new src gets a fresh <img>; keep it invisible until it has loaded
watch(current, function () {
  state['loaded'] = false
})

// Expose
defineExpose({ nextImage, previousImage })
</script>

<style scoped lang="scss">
.stage-media {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 2rem) 0.5rem;
}

.stage-img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: 0.5rem;
  box-shadow:
    0 0 0 1px rgb(244, 239, 230, 0.1),
    0 24px 48px -16px rgb(0, 0, 0, 0.7);
  opacity: 0;
  transform: scale(0.985);
  transition:
    opacity 260ms ease,
    transform 260ms ease;

  &.is-loaded {
    opacity: 1;
    transform: none;
  }
}

.image-nav {
  position: absolute;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--sky-line);
  border-radius: 50%;
  background: rgb(10, 14, 42, 0.6);
  color: var(--star);
  font-size: 1.75rem;
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background-color 200ms ease,
    color 200ms ease,
    transform 200ms ease;

  &:hover {
    background: rgb(10, 14, 42, 0.85);
    color: var(--green-light);
    transform: translateY(-50%) scale(1.06);
  }

  &:active {
    transform: translateY(-50%) scale(0.96);
  }

  &:focus-visible {
    outline-color: var(--green-light);
  }

  &.image-nav-left {
    left: 0.75rem;
  }

  &.image-nav-right {
    right: 0.75rem;
  }
}

.image-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  display: flex;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: var(--r-pill);
  background: rgb(10, 14, 42, 0.6);
  transform: translateX(-50%);
}

.image-dot {
  width: 0.6rem;
  height: 0.6rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgb(244, 239, 230, 0.5);
  cursor: pointer;
  transition:
    background-color 200ms ease,
    transform 200ms ease;

  &:hover {
    background: rgb(244, 239, 230, 0.8);
  }

  &.active {
    background: var(--green-light);
    transform: scale(1.2);
  }

  &:focus-visible {
    outline-color: var(--green-light);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stage-img {
    transform: none;
    transition: none;
  }

  .image-nav,
  .image-dot {
    transition: none;
  }
}
</style>
