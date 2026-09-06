<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="props['visible']" ref="overlayRef" class="modal-overlay" @click.self="close" @touchstart.passive="handleTouchStart" @touchend="handleTouchEnd">
        <div ref="panelRef" class="modal-panel" role="dialog" aria-modal="true" :aria-labelledby="titleId" tabindex="-1">
          <button type="button" class="modal-close" :title="t('projects.close')" :aria-label="t('projects.closeDetails')" @click="close">
            <Icon name="mdi:close" />
          </button>

          <template v-if="props['project']">
            <div class="modal-stage">
              <ModalImageCarousel v-if="images.length" ref="carouselRef" :images="images" :alt="props['project']['name']" />

              <ModalYearRail v-if="hasSiblings" :projects="props['projects']" :current="props['project']" @select="select" />
            </div>

            <div class="modal-paper">
              <div ref="scrollRef" class="modal-scroll">
                <ModalBody :key="props['project']['name']" :project="props['project']" :title-id="titleId" />
              </div>

              <ModalFootNav v-if="hasSiblings" :older="older" :newer="newer" :older-wraps="olderWraps" :newer-wraps="newerWraps" @select="select" />
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import ModalImageCarousel from './ModalImageCarousel.vue'
import ModalBody from './ModalBody.vue'
import ModalYearRail from './ModalYearRail.vue'
import ModalFootNav from './ModalFootNav.vue'

// Props
const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
  projects: {
    type: Array,
    default() {
      return []
    },
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['close', 'select'])

const { t } = useTranslation()

const overlayRef = ref(null)
const panelRef = ref(null)
const scrollRef = ref(null)
const carouselRef = ref(null)
const titleId = useId()
let triggerElement = null
let touchStart = null

const images = computed(function () {
  const list = props['project'] && props['project']['images']
  return list && list.length ? list : []
})

const hasSiblings = computed(function () {
  return props['projects'].length > 1
})

const currentIndex = computed(function () {
  if (!props['project']) {
    return -1
  }

  return props['projects'].findIndex(function (project) {
    return project['_id'] === props['project']['_id']
  })
})

const newer = computed(function () {
  const count = props['projects'].length
  const index = currentIndex.value
  if (index < 0 || count < 2) {
    return null
  }

  return props['projects'][(index - 1 + count) % count]
})

const older = computed(function () {
  const count = props['projects'].length
  const index = currentIndex.value
  if (index < 0 || count < 2) {
    return null
  }

  return props['projects'][(index + 1) % count]
})

const newerWraps = computed(function () {
  return currentIndex.value === 0
})

const olderWraps = computed(function () {
  return currentIndex.value === props['projects'].length - 1
})

// Methods
function close() {
  emit('close')
}

function select(project) {
  emit('select', project)
}

function handleTouchStart(event) {
  if (event.touches.length !== 1) {
    return
  }

  const t = event.touches[0]
  touchStart = { x: t.clientX, y: t.clientY, time: Date.now() }
}

function handleTouchEnd(event) {
  if (!touchStart) {
    return
  }

  const t = event.changedTouches[0]
  const dx = t.clientX - touchStart.x
  const dy = t.clientY - touchStart.y
  const dt = Date.now() - touchStart.time
  touchStart = null

  // Horizontal swipe: 60px+ horizontal, mostly horizontal (1.5x more horiz than vert), under 600ms
  if (Math.abs(dx) >= 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 600) {
    // Swiping left pulls in the project on the right of the rail, the newer one
    const target = dx < 0 ? newer.value : older.value
    if (target) {
      select(target)
    }
  }
}

function getFocusable() {
  if (!panelRef.value) {
    return []
  }

  return Array.from(panelRef.value.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(function (el) {
    return el.offsetParent !== null || el === document.activeElement
  })
}

// Plain arrows move along the rail; Shift+arrows move through the project's images
function handleArrowKey(event) {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return
  }

  const forward = event.key === 'ArrowRight'
  event.preventDefault()

  if (event.shiftKey) {
    const carousel = carouselRef.value
    if (!carousel) {
      return
    }

    if (forward) {
      carousel.nextImage()
    } else {
      carousel.previousImage()
    }
  } else {
    const target = forward ? newer.value : older.value
    if (target) {
      select(target)
    }
  }
}

function handleTabKey(event) {
  const focusables = getFocusable()
  if (!focusables.length) {
    return
  }

  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const active = document.activeElement
  const inside = focusables.includes(active)

  if (event.shiftKey && (!inside || active === first)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && (!inside || active === last)) {
    event.preventDefault()
    first.focus()
  }
}

function handleKeydown(event) {
  if (!props['visible']) {
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    close()
  } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    handleArrowKey(event)
  } else if (event.key === 'Tab') {
    handleTabKey(event)
  }
}

// The lock goes on <html>: its stylesheet overflow-x is clip, so the viewport does not take the body's overflow.
// The body keeps the width it had with a scrollbar, so nothing shifts while the modal is open.
function lockScroll() {
  const gap = window.innerWidth - document.documentElement.clientWidth
  document.documentElement.style.overflow = 'hidden'
  if (gap > 0) {
    document.body.style.paddingRight = `${gap}px`
  }
}

function unlockScroll() {
  document.documentElement.style.overflow = ''
  document.body.style.paddingRight = ''
}

// Watchers
watch(
  function () {
    return props['visible']
  },
  function (visible) {
    if (typeof document === 'undefined') {
      return
    }

    if (visible) {
      triggerElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
      lockScroll()
      nextTick(function () {
        if (panelRef.value) {
          panelRef.value.focus({ preventScroll: true })
        }
      })
    } else {
      unlockScroll()
      if (triggerElement && typeof triggerElement.focus === 'function') {
        triggerElement.focus()
      }

      triggerElement = null
    }
  },
  { immediate: true },
)

watch(
  function () {
    return props['project']
  },
  function () {
    nextTick(function () {
      if (scrollRef.value) {
        scrollRef.value.scrollTop = 0
      }

      if (panelRef.value) {
        panelRef.value.scrollTop = 0
      }

      const active = document.activeElement
      if (active && active.disabled && panelRef.value) {
        panelRef.value.focus({ preventScroll: true })
      }
    })
  },
)

// Lifecycle
onMounted(function () {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(function () {
  window.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    unlockScroll()
  }
})
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgb(10, 14, 42, 0.72);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

/* Phones and tablets: a full-screen viewer; the stage hugs the image, the footer stays put, only the paper scrolls */
.modal-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  border-radius: 0;
  background: var(--paper);
  color: var(--ink);
  outline: none;
}

.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0;
  border: 1px solid var(--sky-line);
  border-radius: 50%;
  background: rgb(10, 14, 42, 0.6);
  color: var(--star);
  font-size: 1.5rem;
  cursor: pointer;
  transition:
    background-color 200ms ease,
    color 200ms ease,
    border-color 200ms ease,
    transform 200ms ease;

  &:hover {
    background: rgb(10, 14, 42, 0.85);
    color: var(--green-light);
    transform: scale(1.06);
  }

  &:focus-visible {
    outline-color: var(--green-light);
  }
}

.modal-stage {
  display: flex;
  flex: none;
  flex-direction: column;
  min-height: 0;
  color: var(--star);
  background:
    radial-gradient(60% 50% at 50% 100%, rgb(201, 112, 92, 0.2) 0%, rgb(201, 112, 92, 0) 100%),
    linear-gradient(180deg, var(--sky-zenith) 0%, var(--sky-mid) 100%);
}

.modal-paper {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
}

.modal-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
}

/* Desktop: a wide viewer, stage on the left and paper on the right */
@media (width >= 64rem) {
  .modal-overlay {
    align-items: center;
    padding: 1.5rem;
  }

  .modal-panel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) clamp(20rem, 36%, 26rem);
    width: min(78rem, 100%);
    height: min(46rem, 100%);
    border-radius: var(--r-card);
    box-shadow: 0 40px 80px -30px rgb(0, 0, 0, 0.65);
  }

  .modal-close {
    top: 1rem;
    right: 1rem;
    border-color: var(--line);
    background: var(--paper);
    color: var(--ink-2);
    font-size: 1.35rem;

    &:hover {
      border-color: var(--green);
      background: var(--card);
      color: var(--ink);
    }

    &:focus-visible {
      outline-color: var(--green);
    }
  }

  .modal-paper {
    border-left: 1px solid var(--line);
  }

  /* Keep the eyebrow and title clear of the close button */
  .modal-scroll :deep(.modal-header) {
    padding-right: 2.5rem;
  }
}

/* Transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 220ms ease;
}

.modal-enter-active .modal-panel {
  transition: transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

.modal-leave-active .modal-panel {
  transition: transform 200ms ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal-panel {
    transform: translateY(28px);
  }
}

@media (width >= 64rem) {
  .modal-enter-from .modal-panel,
  .modal-leave-to .modal-panel {
    transform: scale(0.975) translateY(10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .modal-panel,
  .modal-leave-active .modal-panel,
  .modal-close {
    transition: none;
  }

  .modal-enter-from .modal-panel,
  .modal-leave-to .modal-panel {
    transform: none;
  }
}
</style>
