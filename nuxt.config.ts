// https://nuxt.com/docs/api/configuration/nuxt-config

import { execSync } from 'child_process'

const DEBUG = true

export default defineNuxtConfig({
    // Meta
    appId: 'chrisrahme.dev',
    compatibilityDate: '2024-11-01',

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
    modules: [
        '@nuxt/icon',
        '@nuxt/fonts',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'nuxt-lodash',
    ],

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
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
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
                // { // Not recommended to use keywords
                //     name: 'keywords',
                //     content: [
                //         'Chris Rahmé',
                //         'Full-Stack',
                //         'Back-end',
                //         'Front-end',
                //         'AI',
                //         'Artificial Intelligence',
                //         'ML',
                //         'Machine Learning',
                //         'Software',
                //         'Engineer',
                //         'Developer',
                //         'Programmer',
                //         'Portfolio',
                //         'Lebanon',
                //         'Hire',
                //     ].join(', '),
                // },
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
