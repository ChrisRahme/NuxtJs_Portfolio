<template>
  <div class="project-image">
    <NuxtImg provider="sanity" :src="imageRef(image)" :alt="alt" width="640" height="360" loading="lazy" format="webp" />

    <video
      v-if="armed"
      ref="videoRef"
      class="project-clip"
      :class="{ showing: state['showing'] }"
      :src="videoUrl"
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
      @playing="state['showing'] = play"
    ></video>
  </div>
</template>

<script setup lang="ts">
import type { PROJECTS_QUERY_RESULT } from '~~/sanity.types'

type ProjectImage = NonNullable<PROJECTS_QUERY_RESULT[number]['images']>[number]

const props = withDefaults(
  defineProps<{
    image: ProjectImage
    alt?: string
    play?: boolean
  }>(),
  { alt: '', play: false },
)

const state = reactive({
  showing: false,
})

const videoRef = ref<HTMLVideoElement | null>(null)

const videoUrl = computed(function () {
  return props['image']['video']?.['url'] || ''
})

const preferredMotion = usePreferredReducedMotion()

// The clip loads on the first hover only, so the page does not download every clip up front
const armed = ref(false)

// Hover plays the clip over the image from the start; leaving pauses it and fades back to the image
watch(
  function () {
    return props['play']
  },
  async function (play) {
    if (!videoUrl.value || preferredMotion.value === 'reduce') {
      return
    }

    if (play) {
      armed.value = true
      await nextTick()
      const video = videoRef.value
      if (video) {
        video.currentTime = 0
        video.play().catch(function () {
          state['showing'] = false
        })
      }
    } else {
      state['showing'] = false
      videoRef.value?.pause()
    }
  },
)
</script>

<style scoped lang="scss">
.project-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--paper-2);

  img,
  .project-clip {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.project-clip {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 250ms ease;

  &.showing {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-clip {
    transition: none;
  }
}
</style>
