<template>
  <div class="stage-media">
    <div class="stage-frame" :style="frameStyle" @pointerenter="clip.onPointerEnter" @pointerleave="clip.onPointerLeave">
      <template v-if="current && videoUrl">
        <video
          ref="videoRef"
          :key="current['_key']"
          :src="videoUrl"
          :poster="posterUrl"
          :aria-label="current['alt'] || alt"
          class="stage-img stage-video"
          :class="{ 'is-loaded': state['loaded'] }"
          muted
          loop
          playsinline
          preload="metadata"
          @loadedmetadata="onVideoMetadata"
          @play="clip.onPlay"
          @pause="clip.onPause"
          @click.stop="clip.toggle"
        ></video>

        <span class="play-badge" :class="{ hidden: clip.state['playing'] }" aria-hidden="true">
          <Icon name="mdi:play" />
        </span>
      </template>

      <NuxtImg
        v-else-if="current"
        :key="current['_key']"
        provider="sanity"
        :src="imageRef(current)"
        :alt="current['alt'] || alt"
        densities="x1"
        fetchpriority="high"
        class="stage-img"
        :class="{ 'is-loaded': state['loaded'] }"
        decoding="async"
        @load="state['loaded'] = true"
      />
    </div>

    <div v-if="current && videoUrl" class="clip-bar" :style="barStyle" @click.stop>
      <button
        type="button"
        class="clip-toggle"
        :title="clip.state['playing'] ? t('projects.pauseVideo') : t('projects.playVideo')"
        :aria-label="clip.state['playing'] ? t('projects.pauseVideo') : t('projects.playVideo')"
        @click="clip.toggle"
      >
        <Icon :name="clip.state['playing'] ? 'mdi:pause' : 'mdi:play'" aria-hidden="true" />
      </button>

      <div
        ref="trackRef"
        class="clip-track"
        :class="{ seeking: clip.state['seeking'] }"
        role="slider"
        tabindex="0"
        :aria-label="t('projects.videoProgress')"
        aria-valuemin="0"
        :aria-valuemax="Math.round(clip.state['duration'])"
        :aria-valuenow="Math.round(clip.state['time'])"
        :aria-valuetext="`${formatClipTime(clip.state['time'])} / ${formatClipTime(clip.state['duration'])}`"
        @pointerdown="clip.onTrackPointerDown"
        @pointermove="clip.onTrackPointerMove"
        @pointerup="clip.onTrackPointerUp"
        @pointercancel="clip.onTrackPointerUp"
        @keydown="clip.onTrackKeydown"
      >
        <span class="clip-fill" :style="{ transform: `scaleX(${clip.progress.value})` }"></span>
        <span class="clip-thumb" :style="{ left: `${clip.progress.value * 100}%` }"></span>
      </div>

      <span class="clip-time">{{ formatClipTime(clip.state['time']) }} / {{ formatClipTime(clip.state['duration']) }}</span>
    </div>

    <template v-if="images.length > 1">
      <button
        type="button"
        class="image-nav image-nav-left"
        :title="t('projects.previousImage')"
        :aria-label="t('projects.previousImage')"
        @click.stop="previousImage"
      >
        <Icon name="mdi:chevron-left" />
      </button>

      <button type="button" class="image-nav image-nav-right" :title="t('projects.nextImage')" :aria-label="t('projects.nextImage')" @click.stop="nextImage">
        <Icon name="mdi:chevron-right" />
      </button>

      <div class="image-dots">
        <button
          v-for="(image, index) in images"
          :key="index"
          type="button"
          class="image-dot"
          :class="{ active: state['imageIndex'] === index }"
          :title="t('projects.imageOf', { index: index + 1, total: images.length })"
          :aria-label="t('projects.showImageOf', { index: index + 1, total: images.length })"
          :aria-current="state['imageIndex'] === index ? 'true' : undefined"
          @click.stop="state['imageIndex'] = index"
        ></button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PROJECTS_QUERY_RESULT } from '~~/sanity.types'

const { t } = useTranslation()

type ProjectImage = NonNullable<PROJECTS_QUERY_RESULT[number]['images']>[number]

// Props
const props = withDefaults(
  defineProps<{
    images: ProjectImage[]
    alt?: string
    upcoming?: ProjectImage[]
  }>(),
  {
    alt: '',
    upcoming: function () {
      return []
    },
  },
)

const state = reactive({
  imageIndex: 0,
  loaded: false,
})

const current = computed(function () {
  return props['images'][state['imageIndex']] || null
})

// A slide with a clip plays it in place of the image, which stays the poster (and the card preview)
const videoUrl = computed(function () {
  return current.value?.['video']?.['url'] || ''
})

const img = useImage()

// The URL a slide shows: its clip's poster, or the image as the stage's <NuxtImg> requests it
function slideUrl(image: ProjectImage) {
  if (!hasImage(image)) {
    return ''
  }

  const modifiers = image['video']?.['url'] ? { format: 'webp' } : {}
  // The provider must be passed here: @nuxt/image resolves it before merging the preset.
  // @ts-expect-error -- @nuxt/image types $img() options with the default provider only
  return img(imageRef(image), modifiers, { provider: 'sanity' })
}

const posterUrl = computed(function () {
  return (current.value && slideUrl(current.value)) || undefined
})

function queueSlides() {
  const count = props['images'].length
  const offsets = count > 2 ? [1, count - 1] : count === 2 ? [1] : []
  for (let step = 2; step < count - 1; step++) {
    offsets.push(step)
  }

  const slides = offsets.map(function (offset) {
    return props['images'][(state['imageIndex'] + offset) % count] as ProjectImage
  })
  const urls = [...slides, ...props['upcoming']].map(slideUrl).filter(Boolean)
  queueImages(urls.map(urlTask), true)
}

// Clips never play on their own. Hovering plays them, except with reduced motion, where only the play button does.
const preferredMotion = usePreferredReducedMotion()

const hoverPlays = computed(function () {
  return preferredMotion.value !== 'reduce'
})

const videoRef = ref<HTMLVideoElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const clip = useClipPlayer(videoRef, trackRef, hoverPlays)

function onVideoMetadata() {
  state['loaded'] = true
  clip.onLoadedMetadata()
}

// Sanity asset refs carry the pixel size (image-<id>-<width>x<height>-<format>), so the frame has its shape before the file
// loads and never grows past the image itself
const frameStyle = computed(function () {
  const match = /-(\d+)x(\d+)-/.exec(current.value ? imageRef(current.value) : '')
  return match ? { aspectRatio: `${match[1]} / ${match[2]}`, maxWidth: `${match[1]}px` } : undefined
})

// The clip bar takes the clip's drawn width, which is narrower than the frame when the stage limits the height
const { width: videoWidth } = useElementSize(videoRef)

const barStyle = computed(function () {
  if (videoWidth.value) {
    return { width: `${videoWidth.value}px` }
  }

  return frameStyle.value ? { maxWidth: frameStyle.value['maxWidth'] } : undefined
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
  clip.reset()
  queueSlides()
})

onMounted(queueSlides)

// Expose
defineExpose({ nextImage, previousImage })
</script>

<style scoped lang="scss">
.stage-media {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 0;
  padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 2rem) 0.75rem;
}

/* The frame gives up height to the dots below it, so they sit right under the image */
.stage-frame {
  position: relative;
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
}

.stage-video {
  cursor: pointer;
}

/* Marks a paused clip; it is not a control (the clip and the bar are) */
.play-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid var(--sky-line);
  border-radius: 50%;
  background: rgb(10, 14, 42, 0.6);
  color: var(--star);
  font-size: 2rem;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition:
    opacity 200ms ease,
    transform 200ms ease;

  &.hidden {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.85);
  }
}

/* Same pill as the image dots: play/pause, a seekable track, the time */
.clip-bar {
  display: flex;
  flex: none;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 100%;
  padding: 0.3rem 0.9rem 0.3rem 0.3rem;
  border-radius: var(--r-pill);
  background: rgb(10, 14, 42, 0.6);
  color: var(--star);
}

.clip-toggle {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgb(244, 239, 230, 0.12);
  color: var(--star);
  font-size: 1.25rem;
  cursor: pointer;
  transition:
    background-color 200ms ease,
    color 200ms ease,
    transform 200ms ease;

  /* Touch screens keep :hover after a tap */
  @media (hover: hover) {
    &:hover {
      background: var(--green-light);
      color: var(--sky-zenith);
    }
  }

  &:active {
    transform: scale(0.94);
  }

  &:focus-visible {
    outline-color: var(--green-light);
  }
}

.clip-track {
  position: relative;
  flex: 1;
  height: 1.25rem;
  border-radius: var(--r-pill);
  cursor: pointer;
  touch-action: none;

  /* The rail */
  &::before {
    content: '';
    position: absolute;
    inset: 50% 0 auto;
    height: 4px;
    border-radius: var(--r-pill);
    background: rgb(244, 239, 230, 0.22);
    transform: translateY(-50%);
  }

  &:focus-visible {
    outline: 2px solid var(--green-light);
    outline-offset: 2px;
  }

  &:hover .clip-thumb,
  &:focus-visible .clip-thumb,
  &.seeking .clip-thumb {
    transform: translate(-50%, -50%) scale(1);
  }
}

.clip-fill {
  position: absolute;
  inset: 50% 0 auto;
  height: 4px;
  border-radius: var(--r-pill);
  background: var(--green-light);
  transform-origin: left center;
  translate: 0 -50%;
}

.clip-thumb {
  position: absolute;
  top: 50%;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: var(--star);
  box-shadow: 0 0 0 3px rgb(144, 240, 144, 0.35);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 150ms ease;
}

.clip-time {
  flex: none;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-variant-numeric: tabular-nums;
  opacity: 0.8;
}

/* Phones and tablets: the frame takes the image's own height, capped so the text keeps room */
@media (width < 64rem) {
  .stage-media {
    flex: none;
  }

  .stage-frame {
    max-height: calc(50vh - 6rem);
    max-height: calc(50dvh - 6rem);
  }
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
  display: flex;
  flex: none;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: var(--r-pill);
  background: rgb(10, 14, 42, 0.6);
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
  .image-dot,
  .play-badge,
  .clip-toggle,
  .clip-thumb {
    transition: none;
  }
}
</style>
