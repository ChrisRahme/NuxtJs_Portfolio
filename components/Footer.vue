<template>
    <footer id="footer" class="noselect shadow-sm">
        <nav class="container mx-auto px-8 py-4">
            <div class="hidden md:block text-start">
                <a href="/" class="m-0 p-0 hover:text-[#60C060]">Chris Rahmé</a>
                <p class="m-0 p-0 text-xs hover:text-[#C060C0]" v-if="state['lastUpdated']">Last update: {{ state['lastUpdated'] }}</p>
            </div>

            <div id="links">
                <div id="socials">
                    <small>Find Me</small>
                    <ul>
                        <template v-for="social in state['socials']" :key="social['name']">
                            <li
                                :title="social['name']"
                                :style="{
                                    '--color': social['color'],
                                }"
                            >
                                <a :href="social['link']" target="_blank">
                                    <Icon :name="social['icon']" />
                                </a>
                            </li>
                        </template>
                    </ul>
                </div>

                <div id="friends">
                    <small>My Friends</small>
                    <ul>
                        <template v-for="friend in state['friends']" :key="friend['name']">
                            <li
                                :title="friend['name']"
                                :style="{
                                    '--color': friend['color'],
                                    '--image': `url(/img/friends/${friend['icon']})`,
                                }"
                            >
                                <a :href="friend['link']" target="_blank">
                                    <!-- <img class="iconify" :src="`/img/friends/${friend['icon']}`" /> -->
                                    <div class="mask"></div>
                                </a>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>

            <div class="block md:hidden text-end">
                <a href="/" class="m-0 p-0 hover:text-[#60C060]">Chris Rahmé</a>
                <p class="m-0 p-0 text-xs hover:text-[#C060C0]" v-if="state['lastUpdated']">Last update: {{ state['lastUpdated'] }}</p>
            </div>
        </nav>
    </footer>
</template>

<script setup>
// State
const state = reactive({
    lastUpdated: '',
    socials: [],
    friends: [],
})

// Lifecycle
onBeforeMount(function () {
    const config = useRuntimeConfig()
    const store = useGlobalStore()

    state['lastUpdated'] = config['public']['lastCommit']

    state['socials'] = store['socials'].filter(function (social) {
        return social['show']
    })

    state['friends'] = [
        { name: 'Threads of Joy', link: 'https://joy-of.dev', icon: 'joy-of-dev.png', color: '#C3F9E0' }, // #2DC9A5
        { name: "Introverts' Crate", link: 'https://introvertscrate.com', icon: 'introverts-crate.png', color: '#0087DC' },
    ]
})
</script>

<style scoped lang="scss">
@import '/assets/css/tailwind.css';

footer {
    background-color: var(--color-background-dark);
    color: white;

    & > nav {
        @apply md:flex justify-between items-end;

        & > div {
            &:not(:last-child) {
                @apply mb-4;
            }

            &#links {
                @apply sm:flex gap-16 justify-between items-center;

                #socials,
                #friends {
                    ul {
                        @apply flex items-center gap-4;

                        li,
                        a,
                        .iconify {
                            @apply m-0 p-0;
                        }

                        li {
                            --size: 2rem;
                            font-size: var(--size);
                            max-height: var(--size);

                            &:hover {
                                .iconify {
                                    color: var(--color) !important;
                                    transform: scale(1.05);
                                }

                                .mask {
                                    background-color: var(--color);
                                    transform: scale(1.05);
                                }
                            }

                            .iconify {
                                @apply transition-300;
                                font-size: var(--size);
                            }

                            .mask {
                                @apply transition-300;
                                width: var(--size);
                                height: var(--size);
                                background-color: white;
                                mask-image: var(--image);
                                mask-size: contain;
                                mask-position: center;
                                mask-repeat: no-repeat;
                                -webkit-mask-image: var(--image);
                                -webkit-mask-size: contain;
                                -webkit-mask-position: center;
                                -webkit-mask-repeat: no-repeat;
                            }
                        }
                    }
                }

                #socials {
                    @apply mb-4 sm:mb-0 sm:text-start lg:text-end;

                    ul {
                        @apply sm:justify-start lg:justify-end;
                    }
                }

                #friends {
                    @apply sm:text-end lg:text-start;

                    ul {
                        @apply sm:justify-end lg:justify-start;
                    }
                }
            }
        }
    }
}
</style>
