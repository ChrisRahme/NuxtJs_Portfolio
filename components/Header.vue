<template>
    <!-- <div class="bg-[#E0C040] lg:hidden block">
        <div class="container mx-auto px-8 py-2">
            <p class="m-0 p-0 text-white">⚠️ Mobile website is still under construction.</p>
        </div>
    </div> -->

    <header id="header" class="bg-white shadow-sm">
        <nav class="container mx-auto px-8 py-2">
            <NuxtLink id="nav-icon" to="/">
                <!-- <Avatar /> -->
                <img src="/img/icon.min.svg" alt="Home" />
            </NuxtLink>

            <ul class="flex gap-8">
                <template v-for="link in state['links']" :key="link['text']">
                    <li>
                        <template v-if="link['link']">
                            <NuxtLink :to="link['link']" class="hover:text-[#60C060]">
                                <Icon :name="link['icon']" v-if="link['icon']" />
                                <span :class="link['icon'] ? 'ml-2' : ''">
                                    {{ link['text'] }}
                                </span>
                            </NuxtLink>
                        </template>
                        <template v-else>
                            <span>
                                {{ link['text'] }}
                            </span>
                        </template>
                    </li>
                </template>
            </ul>
        </nav>
    </header>
</template>

<script setup>
const state = reactive({
    links: [
        { text: 'Home', link: '/', icon: 'ph:house-line' },
        { text: 'Resume', link: '/resume', icon: 'ph:user-list' },
        { text: 'Projects', link: '/projects', icon: 'ph:chalkboard-simple' },
        // { text: '|' },
        // { text: 'Contact', link: '/contact', icon: 'ph:envelope' },
        // { name: 'Blog', link: '/blog' },
        // { name: 'Experiments', link: '/experiments' },
    ],
})

onBeforeMount(function () {})
</script>

<style scoped lang="scss">
@import '/assets/css/tailwind.css';

header {
    * {
        overflow: hidden;
    }

    nav {
        @apply flex items-center justify-between;
        height: var(--header-height);

        #nav-icon {
            @apply transition-300 hover:scale-105 opacity-80 hover:opacity-100 p-0 m-0;
            height: calc(var(--header-height) / 1.5);
            width: calc(var(--header-height) / 1.5);
        }

        ul {
            height: 100%;

            li {
                display: flex;
                align-items: center;
                height: 100%;

                a {
                    text-decoration: none;

                    &.router-link-active {
                        color: #60c060;
                    }

                    @media (width < theme('screens.md')) {
                        .iconify {
                            font-size: calc(var(--header-height) / 2.5);
                        }
                    }

                    @media (width >= theme('screens.md')) {
                        &:not(.router-link-active) {
                            transform: translateY(0); // Removing this will break the position of the underline

                            &::before,
                            &::after {
                                content: '';
                                display: block;
                                width: 100%;
                                height: 2px;
                                position: absolute;
                                bottom: 0;
                                border-radius: 1px;
                            }
                        }

                        &:not(:hover) {
                            &::before {
                                background-color: transparent;
                                transform: translateX(-100%);
                            }

                            &::after {
                                @apply transition-transform duration-200 ease-linear;
                                background-color: #60c060;
                                transform: translateX(100%);
                            }
                        }

                        &:hover {
                            &::before {
                                @apply transition-transform duration-200 ease-linear;
                                background-color: #60c060;
                            }

                            &::after {
                                background-color: transparent;
                            }
                        }

                        .iconify {
                            font-size: 1rem;
                            transform: translateY(-20%);
                        }
                    }
                }

                span {
                    @apply hidden md:inline-block;
                }
            }
        }
    }
}
</style>
