<template>
    <header id="header">
        <nav class="wrap" aria-label="Main">
            <NuxtLink to="/" class="brand">
                <NuxtImg src="/img/icon.min.svg" alt="" width="34" height="34" />
                <span class="wordmark">Chris Rahmé</span>
            </NuxtLink>

            <ul class="links">
                <li v-for="link in links" :key="link['to']">
                    <NuxtLink :to="link['to']">{{ link['text'] }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
const links = [
    { text: 'Home', to: '/' },
    { text: 'Resume', to: '/resume' },
    { text: 'Projects', to: '/projects' },
]
</script>

<style scoped lang="scss">
#header {
    position: sticky;
    top: 0;
    z-index: 50;
    height: var(--header-height);
    background: rgba(10, 14, 42, 0.86);
    border-bottom: 1px solid var(--sky-line);
    color: var(--star);

    @supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
        background: rgba(10, 14, 42, 0.68);
        -webkit-backdrop-filter: blur(16px) saturate(140%);
        backdrop-filter: blur(16px) saturate(140%);
    }

    nav {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .brand {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        border-radius: var(--r-pill);
        color: inherit;
        text-decoration: none;

        img {
            display: block;
            width: 2.125rem;
            height: 2.125rem;
            transition: transform 300ms ease;
        }

        .wordmark {
            font-family: var(--font-display);
            font-size: 0.8125rem;
            font-weight: 500;
            letter-spacing: -0.01em;
            white-space: nowrap;
        }

        &:hover img {
            transform: rotate(-8deg) scale(1.05);
        }

        &:focus-visible {
            outline-color: var(--green-light);
        }
    }

    .links {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin: 0;
        padding: 0;
        list-style: none;

        a {
            display: inline-block;
            padding: 0.45rem 0.8rem;
            border-radius: var(--r-pill);
            color: var(--star-dim);
            font-size: 0.9rem;
            font-weight: 500;
            text-decoration: none;
            transition:
                color 200ms ease,
                background-color 200ms ease;

            &:hover {
                color: var(--star);
            }

            &.router-link-exact-active {
                color: var(--green-light);
                background: rgba(96, 192, 96, 0.12);
            }

            &:focus-visible {
                outline-color: var(--green-light);
            }
        }
    }

    @media (width < 400px) {
        .brand .wordmark {
            display: none;
        }

        .links a {
            padding: 0.4rem 0.55rem;
            font-size: 0.85rem;
        }
    }
}
</style>
