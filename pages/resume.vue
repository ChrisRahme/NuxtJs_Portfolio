<template>
    <div id="resume">
        <div id="title" class="md:flex justify-between items-center mb-10">
            <div class="sm:flex items-center gap-4">
                <div id="avatar" class="hover:scale-110 hidden sm:block transition-300">
                    <img class="avatar" src="/img/avatar.svg" alt="Avatar" style="max-height: 12rem; max-width: 12rem; transform: translateY(-7px)" />
                </div>

                <div id="info">
                    <div class="sm:text-right">
                        <h1 class="m-0 hover:scale-110 transition-300">Chris Rahmé</h1>
                        <p class="text-sm text-[#A040A0] font-semibold m-0 mb-4 hover:scale-110 transition-300">Full-Stack & AI Engineer</p>
                    </div>

                    <div class="text-sm">
                        <p>
                            <a href="tel:+961 71 283 701" class="hover:text-[#4040A0] hover:scale-110 transition-300">
                                <Icon name="material-symbols:call" class="fix15 mr-1" />
                                +961 71 283 701
                            </a>
                        </p>
                        <p>
                            <a href="mailto:christopher.rahme@gmail.com" class="hover:text-[#4040A0] hover:scale-110 transition-300">
                                <Icon name="material-symbols:mail" class="fix15 mr-1" />
                                christopher.rahme@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div id="download" class="flex justify-end mt-5 md:mt-0">
                <button class="btn text-lg h-full flex justify-center" @click="downloadCV">
                    <Icon name="material-symbols:download-rounded" class="fix text-2xl mr-1 text-white" />
                    <div class="inline-block">Download CV</div>
                </button>
            </div>
        </div>

        <div id="about">
            <p class="text-justify mb-1">
                I am a <em>full-stack software engineer</em> with a passion for <em>AI and machine learning</em>. Over the years, I've developed expertise in
                full-stack, containerized solutions, mainly utilizing technologies such as <em>VueJs</em>, <em>Python</em>, and <em>Docker</em>, and various AI
                & machine learning frameworks such as <em>Keras</em> and <em>Scikit-Learn</em>.
            </p>
            <p class="hidden text-justify mb-1">
                I have gained a strong background in <em>VoIP data integration</em> and enjoy collaborating with cross-functional teams to architect and
                implement innovative and impactful solutions.
            </p>
            <p class="text-justify">
                I am driven by a focus on code <strong>quality</strong>, <strong>readability</strong>, <strong>efficiency</strong>, and
                <strong>scalability</strong>, and always strive to learn and stay up-to-date with new technologies.
            </p>
        </div>

        <div id="experience">
            <div class="flex gap-4 items-center">
                <h2>Experience</h2>
            </div>

            <Experience />
        </div>

        <div id="education">
            <div class="flex gap-4 items-center">
                <h2>Education</h2>
            </div>

            <Education />
        </div>

        <div id="skills">
            <div class="flex gap-4 items-center">
                <h2>Skills</h2>
                <button class="text-lg mb-2 hover:scale-110 transition" @click="state['showSkillNames'] = !state['showSkillNames']">
                    <Icon name="ph:eye-slash" class="text-[#C06060]" title="Hide Skill Names" v-if="state['showSkillNames']" />
                    <Icon name="ph:eye" class="text-[#6060C0]" title="Show Skill Names" v-else />
                </button>
            </div>

            <Skills :showSkillNames="state['showSkillNames']" />
        </div>

        <div id="languages">
            <div class="flex gap-4 items-center">
                <h2>Languages</h2>
            </div>

            <Languages />
        </div>
    </div>
</template>

<script setup>
import Experience from '../components/resume/Experience.vue'
import Education from '../components/resume/Education.vue'
import Skills from '../components/resume/Skills.vue'
import Languages from '../components/resume/Languages.vue'

// State
const state = reactive({
    mounted: false,
    showSkillNames: false,
})

// Functions
function downloadCV() {
    window.open('/docs/Chris Rahmé CV.pdf', '_blank')
}

// Lifecycle
onBeforeMount(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

onMounted(function () {
    state['mounted'] = true
})

onBeforeUnmount(function () {})
</script>

<style lang="scss" scoped>
#resume {
    padding-top: 1rem;

    & > div:not(:first-of-type) {
        & > div:first-child {
            margin: 4rem 0 1rem 0;

            h2 {
                color: #40a040;
                font-weight: 500;
            }
        }
    }

    #about p {
        em {
            color: #a040a0;
            font-weight: 400;
            font-style: italic;
        }

        strong {
            color: #40a040;
            font-weight: 400;
            font-style: italic;
        }
    }
}
</style>
