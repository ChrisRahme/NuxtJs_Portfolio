<template>
    <footer id="footer" class="noselect shadow-sm">
        <nav class="container mx-auto px-8 py-4 flex justify-between items-center">
            <div>
                <a href="/" class="m-0 p-0 hover:text-[#60C060]">Chris Rahmé</a>
                <p class="m-0 p-0 text-xs hover:text-[#C060C0]">Last update: {{ data['lastUpdated'] }}</p>
            </div>

            <!-- <ul class="flex gap-4">
                <li><NuxtLink to="/">Home</NuxtLink></li>
            </ul> -->

            <ul id="socials" class="flex items-center gap-6">
                <template v-for="social in data['socials']" :key="social['name']">
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
const data = {
    lastUpdated: '2025-01-26',
    socials: [
        { name: 'Linkedin', icon: 'mdi:linkedin', color: '#0A66C2', link: 'https://linkedin.com/in/chris-rahme' },
        { name: 'GitHub', icon: 'mdi:github', color: '#9942FF', link: 'https://github.com/ChrisRahme' },
        { name: 'Stack Overflow', icon: 'mdi:stack-overflow', color: '#F7A664', link: 'https://stackoverflow.com/users/8978116/chris-rahmé' },
        { name: 'Instagram', icon: 'mdi:instagram', color: '#D300C5', link: 'https://www.instagram.com/chris.rahme.1998' },
        { name: 'YouTube', icon: 'mdi:youtube', color: '#FF0000', link: 'https://youtube.com/channel/UC4RT-sfpBNT_H7tCPOMPiqw' },
    ],
}
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
