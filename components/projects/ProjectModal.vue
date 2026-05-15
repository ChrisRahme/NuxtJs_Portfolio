<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="state['visible']" class="modal-overlay" @click.self="close">
                <button class="modal-nav modal-nav-left" @click="previous" title="Previous">
                    <Icon name="mdi:chevron-left" />
                </button>

                <div class="modal-container">
                    <button class="modal-close" @click="close" title="Close">
                        <Icon name="mdi:close" />
                    </button>

                    <div class="modal-content" v-if="state['project']">
                        <div class="modal-image" v-if="images.length">
                            <NuxtImg :src="images[state['imageIndex']]" :alt="state['project']['name']" width="960" height="540" format="webp" />

                            <template v-if="images.length > 1">
                                <button class="image-nav image-nav-left" @click.stop="previousImage" title="Previous image">
                                    <Icon name="mdi:chevron-left" />
                                </button>

                                <button class="image-nav image-nav-right" @click.stop="nextImage" title="Next image">
                                    <Icon name="mdi:chevron-right" />
                                </button>

                                <div class="image-dots">
                                    <button
                                        v-for="(image, index) in images"
                                        :key="index"
                                        class="image-dot"
                                        :class="{ active: state['imageIndex'] === index }"
                                        @click.stop="state['imageIndex'] = index"
                                        :title="`Image ${index + 1}`"
                                    ></button>
                                </div>
                            </template>
                        </div>

                        <div class="modal-body">
                            <div class="modal-header">
                                <h2 class="modal-title">{{ state['project']['name'] }}</h2>
                                <span class="modal-year">{{ state['project']['year'] }}</span>
                            </div>

                            <div class="modal-description" v-if="state['project']['description']">
                                <p v-html="state['project']['description']"></p>
                            </div>

                            <div class="modal-skills" v-if="state['project']['skills'] && state['project']['skills'].length">
                                <h4>Skills & Technologies</h4>

                                <div class="tags-list mb-1">
                                    <template v-for="skill in state['project']['tags']" :key="skill">
                                        <div class="badge">{{ skill }}</div>
                                    </template>
                                </div>

                                <div class="skills-list">
                                    <template v-for="skill in state['project']['skills']" :key="skill">
                                        <div class="badge">{{ skill }}</div>
                                    </template>
                                </div>
                            </div>

                            <div class="modal-links -mb-4" v-if="state['project']['links'] && state['project']['links'].length">
                                <h4>Links</h4>

                                <div class="links-list">
                                    <template v-for="link in state['project']['links']" :key="link['icon']">
                                        <a v-if="link['link']" :href="link['link']" target="_blank" class="modal-link" :title="link['title'] || 'View project'">
                                            <Icon :name="link['icon']" />
                                        </a>
                                        <span v-else class="modal-link disabled" :title="link['title'] || 'Not published'">
                                            <Icon :name="link['icon']" />
                                        </span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="modal-nav modal-nav-right" @click="next" title="Next">
                    <Icon name="mdi:chevron-right" />
                </button>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
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

const state = reactive({
    visible: false,
    project: null,
    imageIndex: 0,
})

const images = computed(function () {
    const list = state['project'] && state['project']['images']
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

function nextImage() {
    if (!images.value.length) return
    state['imageIndex'] = (state['imageIndex'] + 1) % images.value.length
}

function previousImage() {
    if (!images.value.length) return
    state['imageIndex'] = (state['imageIndex'] - 1 + images.value.length) % images.value.length
}

function handleKeyup(event) {
    if (!state['visible']) return

    if (event.key === 'Escape') {
        close()
    } else if (event.key === 'ArrowRight') {
        next()
    } else if (event.key === 'ArrowLeft') {
        previous()
    }
}

// Watchers
watchEffect(function () {
    state['project'] = props['project']
    state['imageIndex'] = 0
})

watchEffect(function () {
    state['visible'] = props['visible']
})

// Lifecycle
onMounted(function () {
    window.addEventListener('keyup', handleKeyup)
})

onBeforeUnmount(function () {
    window.removeEventListener('keyup', handleKeyup)
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
    max-width: 50vw;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    color: var(--color-background-dark);
    opacity: 1;

    &::-webkit-scrollbar {
        display: none;
    }
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

.modal-image {
    width: 100%;
    overflow: hidden;
    position: relative;

    img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 0.75rem 0.75rem 0 0;
    }

    .image-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.4);
        border: none;
        color: #ffffff;
        font-size: 2rem;
        cursor: pointer;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;

        &:hover {
            background: rgba(0, 0, 0, 0.65);
            transform: translateY(-50%) scale(1.1);
        }

        &:active {
            transform: translateY(-50%) scale(0.95);
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
        bottom: 0.75rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5rem;
        padding: 0.4rem 0.6rem;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 1rem;

        .image-dot {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            padding: 0;
            transition: all 0.2s ease;

            &:hover {
                background: rgba(255, 255, 255, 0.8);
            }

            &.active {
                background: #ffffff;
                transform: scale(1.2);
            }
        }
    }
}

.modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h4 {
        @apply font-medium m-0;
        font-size: 0.875rem;
        color: var(--color-background-dark);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.modal-title {
    @apply font-semibold m-0;
    font-size: 1.5rem;
    color: var(--color-background-dark);
}

.modal-year {
    @apply font-medium;
    font-size: 0.875rem;
    color: var(--color-primary);
    background: rgba(var(--color-primary-rgb), 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
}

.modal-description {
    p {
        @apply text-justify leading-relaxed m-0;
        font-size: 0.9rem;
        color: var(--color-background-7);
    }
}

.modal-skills {
    @apply mt-1;

    .tags-list,
    .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tags-list .badge {
        background-color: var(--color-primary);
    }

    .tags-list .badge {
        background-color: var(--color-primary);
    }

    .skills-list .badge {
        background-color: var(--color-inverse);
    }
}

.modal-links {
    .links-list {
        @apply p-0 m-0 -mt-1;

        display: flex;
        gap: 1rem;

        .modal-link {
            font-size: 2rem;
            color: var(--color-background-7);
            transition: all 0.2s ease;

            &:hover:not(.disabled) {
                color: var(--color-primary);
                transform: translateY(-2px);
            }

            &.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }
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
