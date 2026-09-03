<template>
    <div id="about" class="py-8 bg-0" v-if="state['mounted']">
        <div class="container mx-auto px-8">
            <h2 class="text-4xl text-left mb-10">About Me</h2>

            <div class="lg:flex gap-8 px-8 justify-between items-start">
                <div id="about-select">
                    <template v-for="(about, index) in state['abouts']" :key="about['title']">
                        <button
                            class="emoji-button"
                            :class="{ active: state['aboutIndex'] === index }"
                            :title="about['title']"
                            @click="() => changeAbout(index)"
                        >
                            <span class="emoji">
                                {{ about['emoji'] }}
                            </span>
                            <NuxtImg
                                :src="about['image']"
                                :alt="about['title']"
                                :title="about['title']"
                                width="640"
                                height="480"
                                format="webp"
                                loading="lazy"
                                style="max-width: 1px; max-height: 1px; position: absolute; top: 0; left: 0; opacity: 0"
                            />
                        </button>
                    </template>
                </div>

                <div id="about-text" v-if="currentAbout['text'] || currentAbout['button']">
                    <p class="text-justify" v-if="currentAbout['text']">
                        <span class="text-primary">Hi, I'm Chris.</span>
                        <span v-html="currentAbout['text']"></span>
                    </p>

                    <NuxtLink :to="currentAbout['button']['link']" v-if="currentAbout['button']">
                        <button class="btn mt-4">
                            {{ currentAbout['button']['text'] }}
                        </button>
                    </NuxtLink>
                </div>

                <div id="about-image" v-if="currentAbout['image']">
                    <figure
                        :style="{
                            '--rotation': state['aboutImageRotation'][0],
                            '--rotation-hover': state['aboutImageRotation'][1],
                        }"
                    >
                        <NuxtImg :src="currentAbout['image']" :alt="currentAbout['label']" :title="currentAbout['label']" width="640" height="480" format="webp" />

                        <figcaption>
                            {{ currentAbout['label'] }}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { abouts } from '~/data/abouts'

// State
const state = reactive({
    mounted: false,

    abouts: [],
    aboutIndex: 0,
    aboutImageRotation: [2, 3],
})

const currentAbout = computed(function () {
    return state['abouts'][state['aboutIndex']] || {}
})

// Methods
function changeAbout(index) {
    const r1 = 3 * (Math.random() - 0.5)
    const r2 = r1 + (Math.random < 0.5 ? -1 : +1) * (Math.random() + 1)

    state['aboutIndex'] = index
    state['aboutImageRotation'] = [r1, r2]
}

// Lifecycle
onBeforeMount(function () {
    state['abouts'] = abouts.filter(function (about) {
        return about['show']
    })
})

onMounted(function () {
    state['mounted'] = true
    changeAbout(0)
})
</script>

<style scoped lang="scss">
@import '../../assets/css/tailwind.css';

#about {
    --cp: var(--color-primary);

    background-color: var(--color-background-0);

    h2 {
        color: var(--color-primary);
        font-weight: 500;
    }

    #about-select {
        @apply flex lg:flex-col gap-0 lg:gap-4 lg:items-center justify-evenly flex-wrap mb-4 lg:mb-0;

        .emoji-button {
            --fs: 2rem;
            --padding: calc(var(--fs) / 4);
            --size: calc(var(--fs) + var(--padding) * 2);

            @apply inline-block m-0 p-0 shadow-lg transition-300;

            background-color: var(--cp);
            border-radius: 100%;
            border: 2px solid var(--cp);

            margin: 0.5rem 0.75rem;
            width: var(--size);
            height: var(--size);
            max-width: var(--size);
            max-height: var(--size);
            min-width: var(--size);
            min-height: var(--size);

            @media (width >= theme('screens.lg')) {
                margin: 0;

                &:hover {
                    .emoji {
                        transform: translate(-12.5%, -17.5%) scale(1.5);
                    }
                }
            }

            &.active {
                background-color: transparent;
            }

            .emoji {
                @apply inline-block transition-300;
                padding: var(--padding);
                transform: translate(-12.5%, -17.5%);
                font-size: calc(var(--fs));
            }
        }
    }

    #about-image {
        @media (width < theme('screens.lg')) {
            @apply mt-4;
            max-width: 100%;
        }

        @media (width >= theme('screens.lg')) {
            max-width: 40%;
        }

        &:hover {
            img {
                @apply shadow-xl;
                transform: rotateZ(calc(1deg * var(--rotation-hover)));
            }

            figcaption {
                @apply opacity-0;
            }
        }

        img,
        figcaption {
            @apply block transition-300;
            transform: rotateZ(calc(1deg * var(--rotation)));
        }

        img {
            @apply rounded-2xl shadow-lg transition-500;
        }

        figcaption {
            @apply text-right text-xs mt-1 mr-4;
        }
    }
}
</style>
