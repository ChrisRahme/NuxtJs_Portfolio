// https://nuxt.com/docs/api/configuration/nuxt-config

import { execSync } from 'child_process'

// NODE_ENV is "production" during `nuxt build`/`generate`.
const DEBUG = process.env.NODE_ENV !== 'production'

export default defineNuxtConfig({
    // Meta
    appId: 'chrisrahme.dev',
    compatibilityDate: '2025-05-18',
    ssr: true,

    // Debug & Development
    devtools: { enabled: DEBUG },
    debug: DEBUG,
    dev: DEBUG,
    logLevel: DEBUG ? 'info' : 'silent',
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        // https: {
        //     key: 'localhost.key',
        //     cert: 'localhost.crt',
        // },
    },
    runtimeConfig: {
        public: {
            baseUrl: 'https://chrisrahme.dev',
            lastCommit: execSync('git log -1 --format=%cd --date=short').toString().trim(),
        },
    },

    // Modules
    modules: ['@nuxt/icon', '@nuxt/fonts', '@nuxt/image', '@nuxtjs/tailwindcss', '@nuxtjs/robots', '@nuxtjs/sitemap', '@vueuse/nuxt'],

    // Deployment
    site: {
        url: 'https://chrisrahme.dev',
    },

    robots: {
        blockAiBots: true,
    },

    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: './tailwind.config.js',
        // exposeConfig: false,
        // injectPosition: 0,
        viewer: DEBUG,
    },

    css: ['~/assets/css/main.scss'],

    // Head
    app: {
        head: {
            title: 'Chris Rahmé',
            meta: [
                {
                    name: 'description',
                    content: 'Chris Rahmé - Full-Stack & AI Engineer',
                },
                {
                    name: 'author',
                    content: 'Chris Rahmé',
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, user-scalable=1',
                },
                {
                    name: 'charset',
                    content: 'utf-8',
                },
                {
                    name: 'robots',
                    content: 'index, follow',
                },
                // OpenGraph defaults — overridden per-page via useHead
                { property: 'og:site_name', content: 'Chris Rahmé' },
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'Chris Rahmé' },
                { property: 'og:description', content: 'Chris Rahmé - Full-Stack & AI Engineer' },
                { property: 'og:image', content: 'https://chrisrahme.dev/img/avatar.svg' },
                { property: 'og:url', content: 'https://chrisrahme.dev' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: 'Chris Rahmé' },
                { name: 'twitter:description', content: 'Chris Rahmé - Full-Stack & AI Engineer' },
                { name: 'twitter:image', content: 'https://chrisrahme.dev/img/avatar.svg' },
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/svg+xml',
                    href: '/img/icon.min.svg',
                },
            ],
        },
    },
})
