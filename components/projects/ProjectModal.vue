<template>
    <Teleport to="body">
        <Transition name="modal">
            <div
                v-if="props['visible']"
                ref="overlayRef"
                class="modal-overlay"
                role="dialog"
                aria-modal="true"
                :aria-labelledby="titleId"
                @click.self="close"
                @touchstart="handleTouchStart"
                @touchend="handleTouchEnd"
            >
                <button class="modal-nav modal-nav-left" @click="previous" title="Previous project" aria-label="Previous project">
                    <Icon name="mdi:chevron-left" />
                </button>

                <div class="modal-container">
                    <button class="modal-close" @click="close" title="Close" aria-label="Close project details">
                        <Icon name="mdi:close" />
                    </button>

                    <div class="modal-content" v-if="props['project']">
                        <ModalImageCarousel ref="carouselRef" :images="images" :alt="props['project']['name']" v-if="images.length" />

                        <ModalBody :project="props['project']" :title-id="titleId" />
                    </div>

                    <div class="modal-fade" aria-hidden="true"></div>
                </div>

                <button class="modal-nav modal-nav-right" @click="next" title="Next project" aria-label="Next project">
                    <Icon name="mdi:chevron-right" />
                </button>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import ModalImageCarousel from './ModalImageCarousel.vue'
import ModalBody from './ModalBody.vue'

// Props
const props = defineProps({
    project: {
        type: Object,
        default: null,
    },
    visible: {
        type: Boolean,
        default: false,
    },
})

// Emits
const emit = defineEmits(['close', 'next', 'previous'])

const overlayRef = ref(null)
const carouselRef = ref(null)
const titleId = useId()
let triggerElement = null
let touchStart = null

const images = computed(function () {
    const list = props['project'] && props['project']['images']
    return list && list.length ? list : []
})

// Methods
function close() {
    emit('close')
}

function next() {
    emit('next')
}

function previous() {
    emit('previous')
}

function handleTouchStart(event) {
    if (event.touches.length !== 1) return
    const t = event.touches[0]
    touchStart = { x: t.clientX, y: t.clientY, time: Date.now() }
}

function handleTouchEnd(event) {
    if (!touchStart) return
    const t = event.changedTouches[0]
    const dx = t.clientX - touchStart.x
    const dy = t.clientY - touchStart.y
    const dt = Date.now() - touchStart.time
    touchStart = null

    // Horizontal swipe: 60px+ horizontal, mostly horizontal (1.5x more horiz than vert), under 600ms
    if (Math.abs(dx) >= 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 600) {
        if (dx < 0) next()
        else previous()
    }
}

function getFocusable() {
    if (!overlayRef.value) return []
    return Array.from(
        overlayRef.value.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((el) => el.offsetParent !== null || el === document.activeElement)
}

function handleEscapeKey(event) {
    event.preventDefault()
    close()
}

// Plain arrows navigate projects; Shift+arrows navigate the image carousel
function handleArrowKey(event) {
    if (event.metaKey || event.ctrlKey) return

    const forward = event.key === 'ArrowRight'

    if (event.shiftKey) {
        const carousel = carouselRef.value
        if (!carousel) return
        forward ? carousel.nextImage() : carousel.previousImage()
    } else {
        forward ? next() : previous()
    }
}

// Focus trap: Tab / Shift+Tab wrap within the modal
function handleTabKey(event) {
    const focusables = getFocusable()
    if (!focusables.length) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
    }
}

function handleKeydown(event) {
    if (!props['visible']) return

    if (event.key === 'Escape') handleEscapeKey(event)
    else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') handleArrowKey(event)
    else if (event.key === 'Tab') handleTabKey(event)
}

// Watchers
watch(
    () => props['visible'],
    function (visible) {
        if (typeof document === 'undefined') return

        if (visible) {
            triggerElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
            document.body.style.overflow = 'hidden'
            nextTick(function () {
                const closeBtn = overlayRef.value && overlayRef.value.querySelector('.modal-close')
                if (closeBtn) closeBtn.focus()
            })
        } else {
            document.body.style.overflow = ''
            if (triggerElement && typeof triggerElement.focus === 'function') {
                triggerElement.focus()
            }
            triggerElement = null
        }
    },
    { immediate: true }
)

// Lifecycle
onMounted(function () {
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(function () {
    window.removeEventListener('keydown', handleKeydown)
    if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
    }
})
</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    z-index: 1000;
    padding: 1rem;
}

.modal-nav {
    background: var(--color-background, #ffffff);
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--color-background-7);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    flex-shrink: 0;

    &:hover {
        color: var(--color-primary);
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(0.95);
    }

    @media (max-width: 768px) {
        display: none;
    }
}

.modal-container {
    position: relative;
    background: var(--color-background, #ffffff);
    border-radius: 0.75rem;
    width: min(720px, 92vw);
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    color: var(--color-background-dark);
    opacity: 1;

    &::-webkit-scrollbar {
        display: none;
    }
}

.modal-fade {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    margin-top: -2.5rem;
    background: linear-gradient(to bottom, transparent, var(--color-background, #ffffff));
    pointer-events: none;
    z-index: 5;
    border-radius: 0 0 0.75rem 0.75rem;
}

.modal-close {
    @apply transition-all duration-500 rounded-full flex items-center justify-center cursor-pointer bg-none border-none;

    position: absolute;
    color: var(--color-background-7);
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    z-index: 10;

    &:hover {
        @apply text-red-500;
        transform: scale(1.1);
    }
}

.modal-content {
    display: flex;
    flex-direction: column;
}

/* Transition animations */
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;

    .modal-container {
        transform: scale(0.9) translateY(20px);
    }
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    transition: all 0.3s ease;
}
</style>
