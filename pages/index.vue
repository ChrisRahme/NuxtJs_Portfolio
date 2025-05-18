<template>
    <Head>
        <Title>Chris Rahmé | Home</Title>
        <Meta name="description" content="Chris Rahmé - Full-Stack & AI Engineer" />
    </Head>

    <div id="home">
        <div id="hero" class="noselect bg-9">
            <div id="vignette">
                <div class="container mx-auto" style="z-index: 1">
                    <div class="container lg:flex justify-between items-center">
                        <div id="hero-text" class="flex flex-col items-center text-center lg:block lg:text-left">
                            <h3 class="none lg:inline-block mb-0">
                                <!-- <span>Hi, I'm</span> -->
                                <!-- Each char in a span -->
                                <span>H</span>
                                <span>i</span>
                                <span>,</span>
                                <span>&nbsp;</span>
                                <span>I</span>
                                <span>'</span>
                                <span>m</span>
                            </h3>

                            <h1 id="name" class="mb-14 lg:mb-0">Chris Rahmé</h1>

                            <h2 class="mb-5 lg:mb-0">
                                <span>&nbsp;</span>
                                <span id="line-1" text="> Full-Stack Developer"></span>
                                <span class="hidden">Full-Stack Developer</span>
                            </h2>

                            <h2 class="mb-0">
                                <span>&nbsp;</span>
                                <span id="line-2" text="> AI & ML Engineer"></span>
                                <span class="hidden">& AI Engineer</span>
                            </h2>
                        </div>

                        <div id="avatar" class="hidden lg:block">
                            <img class="avatar" src="/img/avatar.svg" alt="Avatar" />
                        </div>
                    </div>
                </div>

                <div id="hero-icons">
                    <template v-for="icon in state['skills']" :key="icon">
                        <div class="hero-icon" style="position: absolute; z-index: 0">
                            <Icon :data-name="icon" :name="icon" />
                        </div>
                    </template>
                </div>
            </div>

            <div id="arrow-down" :class="{ active: !state['hasScrolled'] }" @click="scrollDown" v-if="state['isLoaded']">
                <Icon name="ph:arrow-down" />
            </div>
        </div>

        <template v-if="state['isLoaded']">
            <div id="quote" class="hidden md:block" v-if="state['quote']">
                <div class="pt-8 bg-9"></div>

                <div class="bg-8" @click="changeQuote">
                    <div class="container mx-auto py-8 flex justify-center content-center items-center text-white cursor-pointer">
                        <Icon name="mdi:format-quote-open" class="text-8xl text-[#60C060]" />

                        <p class="text-2xl text-center w-full italic" style="max-width: 45vw">
                            <span>
                                {{ state['quote'] }}
                            </span>
                            <span
                                id="squiggle"
                                :title="`[/src/pages/index.vue] SyntaxError: Unexpected end of quote; expected '”' at position ${state.quote.length}. (This is on purpose)`"
                            >
                                &nbsp;&nbsp;
                            </span>
                        </p>
                    </div>
                </div>

                <div class="pb-0 bg-0"></div>
            </div>

            <div id="about" class="py-8 bg-0">
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
                                    <img
                                        :src="about['image']"
                                        :alt="about['title']"
                                        :title="about['title']"
                                        style="max-width: 1px; max-height: 1px; position: absolute; top: 0; left: 0; opacity: 0"
                                    />
                                </button>
                            </template>
                        </div>

                        <div id="about-text" v-if="state['about']['text'] || state['about']['button']">
                            <p class="text-justify" v-if="state['about']['text']">
                                <span class="text-primary">Hi, I'm Chris.</span>
                                <span v-html="state['about']['text']"></span>
                            </p>

                            <NuxtLink :to="state['about']['button']['link']" v-if="state['about']['button']">
                                <button class="btn mt-4">
                                    {{ state['about']['button']['text'] }}
                                </button>
                            </NuxtLink>
                        </div>

                        <div id="about-image" v-if="state['about']['image']">
                            <figure
                                :style="{
                                    '--rotation': state['aboutImageRotation'][0],
                                    '--rotation-hover': state['aboutImageRotation'][1],
                                }"
                            >
                                <img :src="state['about']['image']" :alt="state['about']['label']" :title="state['about']['label']" />

                                <figcaption>
                                    {{ state['about']['label'] }}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { useGlobalStore } from '~/stores/globalStore'

definePageMeta({
    layout: 'home', // No need to mention if default
})

// State
const state = reactive({
    mounted: false,
    isLoaded: false,
    hasScrolled: false,

    quotes: [],
    quote: null,

    skills: [],

    abouts: [],
    aboutIndex: 0,
    aboutImageRotation: [2, 3],
    about: computed(function () {
        return state['abouts'][state['aboutIndex']]
    }),
})

// Animation Functions
function popIcons() {
    const NEW_ICON_INTERVAL = 900 // in milliseconds
    const ICON_LIFESPAN = 2100 // in milliseconds
    const ICON_ROTATION_RANGE = [-30, 30] // in degrees
    const ICON_SCALE_RANGE = [0.5, 1.5] // in percentage

    function checkPointInsideEllipse([Ax, Ay], [Ox, Oy, Rx, Ry]) {
        // [Ax, Ay] are the coordinates of the point
        // [Ox, Oy] are the coordinates of the center of the ellipse
        // [Rx, Ry] are the radii of the ellipse

        // [Ax, Ay] is inside the ellipse if:
        // (Ax - Ox)^2 / Rx^2 + (Ay - Oy)^2 / Ry^2 <= 1

        const t1 = Math.pow(Ax - Ox, 2) / Math.pow(Rx, 2)
        const t2 = Math.pow(Ay - Oy, 2) / Math.pow(Ry, 2)

        return t1 + t2 <= 1
    }

    function checkShapeInsideEllipse(corners, E) {
        return corners.every(function (corner) {
            return checkPointInsideEllipse(corner, E)
        })
    }

    function checkPointInsideQuad([Px, Py], [Ax, Ay, Bx, By]) {
        // [Px, Py] are the coordinates of the point
        // [Ax, Ay] are the coordinates of the top left corner
        // [Bx, By] are the coordinates of the bottom right corner

        // [Px, Py] is inside the quad if:
        // Ax <= Px <= Bx and Ay <= Py <= By

        return Ax <= Px && Px <= Bx && Ay <= Py && Py <= By
    }

    function checkShapeInsideQuad(corners, Q) {
        return corners.every(function (corner) {
            return checkPointInsideQuad(corner, Q)
        })
    }

    function main() {
        if (!state['mounted']) return

        const displayContainer = document.getElementById('vignette') // Where the icon can be displayed
        const iconsContainer = document.getElementById('hero-icons') // From where the icon will be picked

        // Get random icon element (should not have class `visible`)
        const icons = Array.from(iconsContainer.getElementsByClassName('hero-icon')).filter(function (element) {
            return !element.classList.contains('visible')
        })

        const iconIndex = Math.floor(Math.random() * icons.length)
        const iconElement = icons[iconIndex]

        // Get iconElement width and height
        const w = iconElement.offsetWidth
        const h = iconElement.offsetHeight

        // Get ellipse center and radii
        const bodyRect = document.body.getBoundingClientRect()
        const displayRect = displayContainer.getBoundingClientRect()
        const [Rx, Ry] = [displayRect.width / 2, displayRect.height / 2]
        const [Ox, Oy] = [displayRect.left + Rx, displayRect.top + Ry]

        // Retry until the icon is inside the ellipse
        let isInside = false
        while (!isInside) {
            // Get pixel coordinate inside displayContainer
            const x = Math.random() * displayContainer.offsetWidth
            const y = Math.random() * displayContainer.offsetHeight

            // Set iconContainer position
            iconElement.style.left = x + 'px'
            iconElement.style.top = y + 'px'

            // Give random rotation and scale
            const [R_min, R_max] = ICON_ROTATION_RANGE
            const [S_min, S_max] = ICON_SCALE_RANGE
            const scale = Math.random() * (S_max - S_min) + S_min
            const rotate = Math.random() * (R_max - R_min) + R_min

            iconElement.style.transform = `rotate(${rotate}deg) scale(${scale})`

            // Get the coordinates of the 4 points of the element
            const iconRect = iconElement.getBoundingClientRect()
            const [Ax, Ay] = [iconRect.left, iconRect.top]
            const [Bx, By] = [iconRect.right, iconRect.top]
            const [Cx, Cy] = [iconRect.right, iconRect.bottom]
            const [Dx, Dy] = [iconRect.left, iconRect.bottom]

            isInside = checkShapeInsideEllipse(
                [
                    [Ax, Ay],
                    [Bx, By],
                    [Cx, Cy],
                    [Dx, Dy],
                ],
                [Ox, Oy, Rx, Ry]
            )
        }

        // // Add class `visible` to iconContainer
        iconElement.classList.add('visible')

        // Display another icon after 1.5s
        setTimeout(function () {
            main()
        }, NEW_ICON_INTERVAL)

        // Remove class `visible` after 2s
        setTimeout(function () {
            iconElement.classList.remove('visible')
        }, ICON_LIFESPAN)
    }

    const interval = setInterval(function () {
        const displayContainer = document.getElementById('vignette') // Where the icon can be displayed
        const iconsContainer = document.getElementById('hero-icons') // From where the icon will be picked

        if (displayContainer && iconsContainer) {
            clearInterval(interval)
            main()
        }
    }, 100)
}

function typeLines() {
    const TYPING_SPEED = 8 // characters per second
    const TYPING_VARIANCE = 0.5 // characters per second
    const LINES_INTERVAL = 500 // ms between typing each line

    function getTypingSpeed() {
        return TYPING_SPEED + (Math.random() * 2 - 1) * TYPING_VARIANCE
    }

    function startTyping(element, text) {
        element.textContent = ''

        const interval = setInterval(function () {
            element.textContent += text.charAt(element.textContent.length)

            if (element.textContent.trim() === text.trim()) {
                element.textContent = text.trim()
                clearInterval(interval)
            }
        }, 1000 / getTypingSpeed())
    }

    function main(line1, line2) {
        if (!state['mounted']) return

        line1 = document.getElementById('line-1')
        line2 = document.getElementById('line-2')

        // Get `text` attribute
        const text1 = line1.getAttribute('text')
        const text2 = line2.getAttribute('text')

        startTyping(line1, text1)

        setTimeout(function () {
            startTyping(line2, text2)
        }, LINES_INTERVAL + (1000 * text1.length) / TYPING_SPEED)
    }

    const interval = setInterval(function () {
        const line1 = document.getElementById('line-1')
        const line2 = document.getElementById('line-2')

        if (line1 && line2) {
            clearInterval(interval)
            main(line1, line2)
        }
    })
}

function watchScroll() {
    document.addEventListener('scroll', function (event) {
        if (!state['mounted']) return

        // Get scroll position
        const scrollY = window.scrollY

        // Get header height
        const header = document.getElementById('header')
        const headerRect = header.getBoundingClientRect()
        const headerHeight = headerRect.height

        // Update `hasScrolled` state
        state['hasScrolled'] = scrollY >= headerHeight
    })
}

// UI Functions
function scrollDown() {
    // Scroll down so that the bottom of the `#hero` element is at the top
    if (!state['mounted']) return
    if (state['hasScrolled']) return

    state['hasScrolled'] = true

    const hero = document.getElementById('hero')
    const heroRect = hero.getBoundingClientRect()
    const heroBottom = heroRect.top + heroRect.height

    window.scrollTo({ top: heroBottom, behavior: 'smooth' })
}

// Methods
function changeQuote() {
    const oldQuote = state['quote']
    const quotes = state['quotes']
    const index = Math.floor(Math.random() * quotes.length)
    const newQuote = quotes[index]

    if (oldQuote === newQuote && quotes.length > 1) {
        changeQuote()
    } else {
        state['quote'] = newQuote
    }
}

function changeAbout(index) {
    const r1 = 3 * (Math.random() - 0.5)
    const r2 = r1 + (Math.random < 0.5 ? -1 : +1) * (Math.random() + 1)

    state['aboutIndex'] = index
    state['aboutImageRotation'] = [r1, r2]
}

// Lifecycle

onBeforeMount(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const store = useGlobalStore()

    state['skills'] = store['skills']
        .map(function (group) {
            return group['icons']
        })
        .flat()
        .filter(function (icon) {
            return icon && icon['showVignette']
        })
        .map(function (icon) {
            return icon['icon']
        })

    state['quotes'] = store['quotes']

    state['abouts'] = store['abouts'].filter(function (about) {
        return about['show']
    })
})

onMounted(async function () {
    state['mounted'] = true

    changeQuote()
    changeAbout(0)

    typeLines()
    popIcons()
    watchScroll()

    // const store = useGlobalStore()
    // await store.asyncTest()
    // console.log(store.name, store.description)

    state['isLoaded'] = true
})

onBeforeUnmount(function () {
    state['mounted'] = false
})
</script>

<style scoped lang="scss">
@import '/assets/css/tailwind.css';

#home {
    --cp: var(--color-primary);
    --ci: var(--color-inverse);
    --cpl: var(--color-primary-light);
    --cpd: var(--color-primary-dark);

    div {
        &.bg-1 {
            background-color: var(--color-background-1);
        }

        &.bg-2 {
            background-color: var(--color-background-2);
        }

        &.bg-3 {
            background-color: var(--color-background-3);
        }

        &.bg-4 {
            background-color: var(--color-background-4);
        }

        &.bg-5 {
            background-color: var(--color-background-5);
        }

        &.bg-6 {
            background-color: var(--color-background-6);
        }

        &.bg-7 {
            background-color: var(--color-background-7);
        }

        &.bg-8 {
            background-color: var(--color-background-8);
        }

        &.bg-9 {
            background-color: var(--color-background-9);
        }

        h2 {
            color: var(--color-primary);
            font-weight: 500;
        }
    }

    #hero {
        --hero-height: calc(100vh - var(--header-height));
        --avatar-height: calc(var(--hero-height) * 0.4);
        --h1-fs: min(calc(var(--hero-height) * 0.15), 20vw);
        --h2-fs: calc(var(--h1-fs) * 0.4);
        --blur-spread: 80px;

        height: var(--hero-height);
        background-color: var(--color-background-9);
        padding: calc(var(--blur-spread) / 2) 0;

        #vignette {
            @apply flex flex-col justify-center w-full overflow-hidden text-white lg:rounded-[50%];

            height: 100%;
            box-shadow: inset 0 0 var(--blur-spread) var(--color-background-9), 0 0 var(--blur-spread) var(--color-background-8);
            // border-radius: 100%;
            background-color: var(--color-background-8);
            backdrop-filter: blur(var(--blur-spread));

            .container {
                padding: var(--content-py) var(--content-px);

                #hero-text {
                    h1 {
                        font-family: 'Itim', 'Montserrat', sans-serif;
                        font-size: var(--h1-fs);
                        line-height: var(--h1-fs);

                        color: var(--color-primary); // Fallback
                        background: -webkit-linear-gradient(top, var(--cpl) 0%, var(--cp) 25%, var(--cpd) 100%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;

                        width: fit-content;
                    }

                    h2 {
                        @apply transition-300;

                        font-family: 'Itim', 'Montserrat', sans-serif;
                        font-size: var(--h2-fs);
                        line-height: var(--h2-fs);

                        color: var(--color-background);

                        width: fit-content;

                        &:hover {
                            transform: translateX(0.25ch);
                            color: var(--cpl);
                        }
                    }

                    h3 > span {
                        @apply transition-100;

                        font-family: 'Itim', 'Montserrat', sans-serif;
                        font-size: var(--h2-fs);
                        line-height: var(--h2-fs);

                        color: var(--color-background);

                        width: fit-content;

                        &:hover {
                            color: var(--ci);
                        }
                    }
                }

                #avatar {
                    .avatar {
                        @apply btn cursor-default rounded-full pb-0 pt-4 m-0 transition-500;

                        width: var(--avatar-height);
                        height: var(--avatar-height);

                        background-color: var(--cpd);
                    }

                    &:hover .avatar {
                        transform: scale(1.1) rotateY(180deg) !important;
                    }
                }
            }
        }

        .hero-icon {
            @apply transition-opacity duration-500;

            --size: 4rem;

            position: absolute;
            opacity: 0;

            display: flex;
            align-items: center;
            justify-content: center;
            align-content: center;

            // background-color: var(--color-background-5);
            padding: 8px;
            margin: 8px;

            border-radius: 0.5rem;
            // transform: translateY(-200px); /* For whatever reason, this is necessary for the animation to work properly */

            &.visible {
                @apply transition-opacity duration-500;
                opacity: 1;
            }

            .iconify {
                @apply transition-opacity duration-500;
                // color: var(--color-background-9);
                color: var(--color-background-5);

                font-size: var(--size);
                width: var(--size);
                height: var(--size);
            }
        }

        #arrow-down {
            --size: 3rem;
            --scale: 1.1;
            --fs: calc(0.5 * var(--size));

            @apply transition-300;

            display: flex;
            align-items: center;
            justify-content: center;

            position: absolute;
            left: 50%;
            bottom: var(--size);
            width: var(--size);
            height: var(--size);

            background-color: var(--color-background-1);
            border-radius: 50%;

            transform: translateY(0%);
            animation: arrow-bounce 10s infinite;

            &:hover {
                background-color: var(--color-background-0);

                transform: scale(var(--scale));
                animation: none;

                .iconify {
                    transform: scale(calc(1 / var(--scale)));
                }
            }

            &.active {
                opacity: 1;
                cursor: pointer;
            }

            &:not(.active) {
                opacity: 0;
                cursor: default;
            }

            .iconify {
                font-size: var(--fs);
                width: var(--fs);
                height: var(--fs);
            }
        }
    }

    #quote {
        @apply transition-300;

        position: relative;
        z-index: 1;

        &:hover {
            .iconify {
                transform: scale(1.1) rotateZ(-1.5deg);
            }
        }

        #squiggle {
            --fs: 1rem;

            border-bottom: 2px dotted red;
            display: inline-block;
            position: relative;

            &:after {
                content: '';
                display: block;
                position: absolute;
                top: calc(50% + var(--fs) - 1px);
                left: -2px;
                width: 100%;
                height: 4px;
                font-size: var(--fs);
                border-bottom: 2px dotted red;
            }
        }

        .iconify {
            @apply transition-300;
        }
    }

    #about {
        #about-select {
            @apply flex lg:flex-col gap-4 lg:items-center justify-evenly flex-wrap mb-4 lg:mb-0;

            .emoji-button {
                --fs: 2rem;
                --padding: 0.6rem;
                --size: calc(var(--fs) + var(--padding) * 2);

                @apply inline-block m-0 p-0 shadow-lg transition-300;

                background-color: var(--cp);
                border-radius: 100%;
                border: 2px solid var(--cp);

                width: var(--size);
                height: var(--size);
                padding: var(--padding);

                &:hover {
                    .emoji {
                        transform: scale(2.2);
                    }
                }

                &.active {
                    background-color: transparent;
                }

                .emoji {
                    @apply inline-block transition-300;
                    transform: scale(2);
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
}

@keyframes arrow-bounce {
    0% {
        transform: translateY(0%);
    }
    70% {
        transform: translateY(0%);
    }
    75% {
        transform: translateY(25%);
    }
    80% {
        transform: translateY(0%);
    }
    85% {
        transform: translateY(20%);
    }
    90% {
        transform: translateY(0%);
    }
    95% {
        transform: translateY(15%);
    }
    100% {
        transform: translateY(0%);
    }
}
</style>
