<template>
    <!-- Under construction (only show on mobile) -->
    <div class="bg-[#E0C040] lg:hidden block">
        <div class="container mx-auto px-8 py-2">
            <p class="m-0 p-0 text-white">⚠️ Mobile website is still under construction.</p>
        </div>
    </div>

    <header id="header" class="bg-white shadow-sm">
        <nav class="container mx-auto px-8 py-2 flex justify-between items-center">
            <NuxtLink to="/" id="nav-icon" class="p-0 m-0">
                <!-- <Avatar /> -->
                <img src="/img/icon.min.svg" alt="Home" />
            </NuxtLink>

            <ul class="flex gap-4">
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/resume">Resume</NuxtLink></li>
                <li><NuxtLink to="/projects">Projects</NuxtLink></li>
                <li>|</li>
                <li><NuxtLink to="/contact">Contact</NuxtLink></li>
                <!-- <li><NuxtLink to="/blog">Blog</NuxtLink></li> -->
                <!-- <li><NuxtLink to="/experiments">Experiments</NuxtLink></li> -->
            </ul>
        </nav>
    </header>
</template>

<script setup></script>

<style scoped lang="scss">
@import '/assets/css/tailwind.css';

header {
    // height: min(10vh, 60px);

    * {
        overflow: hidden;
    }

    nav {
        height: var(--header-height);

        #nav-icon {
            @apply transition-300 hover:scale-105 opacity-80 hover:opacity-100;
            height: calc(var(--header-height) / 1.5);
            width: calc(var(--header-height) / 1.5);
        }

        ul {
            height: 100%;

            li {
                display: flex;
                align-items: center;
                height: 100%;
                margin-right: 1rem;

                a {
                    text-decoration: none;

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
                    }

                    &.router-link-active {
                        color: #60c060;
                    }
                }
            }
        }
    }
}
</style>
