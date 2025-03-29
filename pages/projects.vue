<template>
    <!-- Under construction -->
    <div class="bg-[#E0C040] w-100 rounded">
        <div class="w-100 px-8 py-2">
            <p class="m-0 p-0 text-white">⚠️ Page is still under construction.</p>
        </div>
    </div>

    <div id="projects" class="flex flex-wrap justify-center">
        <template v-for="project in state['projects']" :key="project['name']">
            <div class="project-card-wrapper">
                <div class="project-card card hover:shadow-lg">
                    <div class="project-image mb-4" v-if="project['image']">
                        <img :src="project['image']" :alt="project['name']" class="rounded shadow-sm" />
                    </div>

                    <div class="project-title mb-2" v-if="project['name']">
                        <h4 class="font-medium">
                            {{ project['name'] }}
                        </h4>
                    </div>

                    <div class="project-description" v-if="project['description']">
                        <p
                            v-html="
                                project['description']
                                    .split('<br>')
                                    .map(function (line, index) {
                                        return `<span class='block mb-2'>${line}</span>`
                                    })
                                    .join('')
                            "
                        ></p>
                    </div>

                    <div class="project-skills mb-2" v-if="project['skills'] && project['skills'].length">
                        <template v-for="skill in project['skills']" :key="skill">
                            <div class="badge mr-1">
                                {{ skill }}
                            </div>
                        </template>
                    </div>

                    <div class="project-links flex justify-end" v-if="project['links'] && project['links'].length">
                        <template v-for="link in project['links']" :key="link['icon']">
                            <div class="project-link ms-2">
                                <a :href="link['link']" target="_blank" title="Visit website">
                                    <Icon :name="link['icon']" class="fix" />
                                </a>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
const state = reactive({
    projects: [],
})

// Lifecycle
onBeforeMount(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const store = useGlobalStore()

    // state['projects'] = store['projects']
    state['projects'] = [
        {
            name: 'Smart WiFi Locks',
            description: `
                A smart lock system featuring an intuitive administrative platform, advanced user
                permission management, and customizable scheduling capabilities, designed to streamline access control
                and enhance security.
                <br>
                Built with a multidisciplinary team of engineers as part of a university project.
            `,
            image: '/img/projects/smart-wifi-locks.png',
            links: [{ icon: 'mdi:github', link: 'https://github.com/ChrisRahme/WiFi_Locks' }],
            skills: ['Python', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'MQTT', 'Arduino', 'Raspberry Pi'],
            year: 2021,
        },
        {
            name: 'NLP AI Chatbot',
            description: `
                An NLP customer service chatbot powered by Rasa, equipped with a web chat widget, a mobile application,
                and an admin interface. The chatbot helps customers of an Internet Service Provider to troubleshoot
                their internet connection issues, and understands English, French, Arabic, and Armenian.
                <br>
                Built by myself as part of my engineering final year project.
            `,
            image: '/img/projects/nlp-ai-chatbot.png',
            links: [{ icon: 'mdi:github', link: 'https://github.com/ChrisRahme/FYP-Chatbot' }],
            skills: ['Python', 'Rasa', 'MySQL', 'Kotlin', 'HTML', 'CSS', 'JavaScript', 'Docker', 'Kubernetes', 'Helm'],
            year: 2022,
        },
        {
            name: 'VueJS Personal Website',
            description: `
                The first iteration of my personal website, built to learn VueJS and how to deploy static websites.
                Explore who I am, my resume, and my projects.
            `,
            image: '/img/projects/VueJs-website.png',
            links: [
                { icon: 'mdi:web', link: 'https://chrisrahme-v1.netlify.app' },
                { icon: 'mdi:github', link: 'https://github.com/ChrisRahme/VueJs_Portfolio' },
            ],
            skills: ['VueJs', 'Netlify'],
            year: 2022,
        },
        {
            name: 'NuxtJS Personal Website',
            description: `
                The second version of my personal website, built from the ground up with NuxtJs this time.
                It's where you are now!
                <br>
                Discover more about me, my professional journey, and the projects I've been working on.
            `,
            image: '/img/projects/nuxtjs-website.png',
            links: [
                { icon: 'mdi:web', link: 'https://chrisrahme.netlify.app' },
                { icon: 'mdi:github', link: 'https://github.com/ChrisRahme/NuxtJs_Portfolio' },
            ],
            skills: ['NuxtJs', 'VueJs', 'Netlify'],
            year: 2025,
        },
        {
            name: 'Tappy Raven',
            description: `
                A fast-paced, Flappy Bird-inspired mobile game where you guide a raven through obstacles to achieve
                the highest score while trying to collect as many gems as possible.
                <br>
                Took one day to develop it, and a week to upload it on the Google Play Store.
            `,
            image: '/img/projects/tappy-raven.webp',
            links: [
                { icon: 'mdi:web', link: 'https://play.google.com/store/apps/details?id=com.ChraGames.TappyRaven' },
                { icon: 'mdi:github', link: 'https://github.com/ChrisRahme/TappyRaven' },
            ],
            skills: ['Unity', 'C#'],
            year: 2020,
        },
        {
            name: 'Speech Emotion Recognition',
            description: `
                An ensemble of speech emotion recognition AI models created to analyze multilingual speech.
                The model provides insights through visualizations, such as emotion charts per-speaker per-second to
                track sentiment changes throughout conversations.
                <br>
                Built by myself for my master's thesis and integrated into Synergi SER for Data Consult.
            `,
            image: '/img/projects/speech-emotion-recognition.png',
            links: [{ icon: 'mdi:github', link: 'https://github.com/ChrisRahme/Speech_Emotion_Recognition' }],
            skills: ['Python', 'Flask', 'Keras', 'Librosa'],
            year: 2023,
        },
        {
            name: 'AI Forge',
            description: `
                A web application designed to offer easy-to-use and flexible tools for data science, analytics, and
                machine learning workflows for both technical and non-technical users to quickly build AI models.
                <br>
                Built as a successor to MindForge from Data Consult as a personal project.
            `,
            image: '/img/projects/ai-forge.png',
            links: [{ icon: 'mdi:github', link: 'https://github.com/ChrisRahme/AI_Forge' }],
            skills: ['VueJs', 'Python', 'Flask', 'SQLAlchemy', 'Scikit-Learn', 'Pandas', 'MySQL'],
            year: 2025,
        },
        {
            name: 'NewsFinder',
            description: `
                An LLM search engine web application that uses RAG techniques to search offline documents for relevant
                news articles, and extends the search online when needed.
            `,
            image: '/img/projects/newsfinder.png',
            links: [{ icon: 'mdi:github', link: 'https://github.com/ChrisRahme/NewsFinder' }],
            skills: ['VueJs', 'Python', 'Flask', 'LangChain'],
            year: 2024,
        },
    ]
})
</script>

<style scoped lang="scss">
#projects {
    .project-card-wrapper {
        --n-items: 3;
        --gap: 1rem;
        --width: calc(100% / var(--n-items) - 2 * var(--gap));

        width: var(--width);
        max-width: 500px;

        padding: var(--gap);

        .project-card {
            .project-image {
                img {
                    width: 100%;
                    max-height: 200px;
                    object-fit: cover;
                }
            }

            .project-title {
            }

            .project-description {
                div {
                    margin-bottom: 10rem;
                }
            }

            .project-skills {
            }

            .project-links {
                .project-link {
                    font-size: 2rem;
                }
            }
        }
    }
}
</style>
