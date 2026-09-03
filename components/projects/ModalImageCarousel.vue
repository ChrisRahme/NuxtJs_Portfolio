<template>
    <div class="modal-image">
        <Transition name="image-fade" mode="out-in">
            <NuxtImg :key="images[state['imageIndex']]" :src="images[state['imageIndex']]" :alt="alt" width="960" height="540" format="webp" />
        </Transition>

        <template v-if="images.length > 1">
            <button class="image-nav image-nav-left" @click.stop="previousImage" title="Previous image" aria-label="Previous image">
                <Icon name="mdi:chevron-left" />
            </button>

            <button class="image-nav image-nav-right" @click.stop="nextImage" title="Next image" aria-label="Next image">
                <Icon name="mdi:chevron-right" />
            </button>

            <div class="image-dots">
                <button
                    v-for="(image, index) in images"
                    :key="index"
                    class="image-dot"
                    :class="{ active: state['imageIndex'] === index }"
                    @click.stop="state['imageIndex'] = index"
                    :title="`Image ${index + 1} of ${images.length}`"
                    :aria-label="`Show image ${index + 1} of ${images.length}`"
                    :aria-current="state['imageIndex'] === index ? 'true' : undefined"
                ></button>
            </div>
        </template>
    </div>
</template>

<script setup>
// Props
const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
    alt: {
        type: String,
        default: '',
    },
})

const state = reactive({
    imageIndex: 0,
})

// Methods
function nextImage() {
    if (!props['images'].length) return
    state['imageIndex'] = (state['imageIndex'] + 1) % props['images'].length
}

function previousImage() {
    if (!props['images'].length) return
    state['imageIndex'] = (state['imageIndex'] - 1 + props['images'].length) % props['images'].length
}

// Watchers
watch(
    () => props['images'],
    function () {
        state['imageIndex'] = 0
    }
)

// Expose
defineExpose({ nextImage, previousImage })
</script>

<style scoped lang="scss">
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

    .image-fade-enter-active,
    .image-fade-leave-active {
        transition: opacity 0.18s ease-in-out;
    }

    .image-fade-enter-from,
    .image-fade-leave-to {
        opacity: 0;
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
</style>
