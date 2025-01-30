<template>
    <footer id="footer" class="noselect shadow-sm">
        <nav class="container mx-auto px-8 py-4 flex justify-between items-center">
            <div>
                <a href="/" class="m-0 p-0 hover:text-[#60C060]">Chris Rahmé</a>
                <p class="m-0 p-0 text-xs hover:text-[#C060C0]" v-if="state['lastUpdated']">Last update: {{ state['lastUpdated'] }}</p>
            </div>

            <!-- <ul class="flex gap-4">
                <li><NuxtLink to="/">Home</NuxtLink></li>
            </ul> -->

            <ul id="socials" class="flex items-center gap-6">
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
        </nav>
    </footer>
</template>

<script setup>
// State
const state = reactive({
    lastUpdated: '',
    socials: [],
})

// Lifecycle
onBeforeMount(function () {
    const config = useRuntimeConfig()
    const store = useGlobalStore()

    state['lastUpdated'] = config['public']['lastCommit']

    state['socials'] = store['socials'].filter(function (social) {
        return social['show']
    })
})
</script>

<style scoped lang="scss">
@import '/assets/css/tailwind.css';

footer {
    background-color: var(--color-background-dark);
    color: white;

    #socials {
        ul,
        li,
        a,
        .iconify {
            @apply m-0 p-0;
        }

        li {
            &:hover {
                .iconify {
                    color: var(--color) !important;
                    transform: scale(1.05);
                }
            }

            .iconify {
                @apply transition-300;

                font-size: 2rem;
            }
        }
    }
}
</style>
