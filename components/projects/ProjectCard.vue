<template>
    <div class="project-card card">
        <ProjectCardImage class="mb-4" :src="previewImage" :alt="project['name']" v-if="showImageTop" />

        <div class="project-title mb-1" v-if="project['name']">
            <h4 class="font-medium">
                {{ project['name'] }}
            </h4>
        </div>

        <div class="project-description" v-if="project['description']">
            <p v-html="formattedDescription"></p>
        </div>

        <ProjectCardImage class="my-4" :src="previewImage" :alt="project['name']" v-if="showImageBottom" />

        <div class="project-skills mb-2" v-if="hasSkills">
            <template v-for="skill in project['skills']" :key="skill">
                <div class="badge mr-1">
                    {{ skill }}
                </div>
            </template>
        </div>

        <ProjectCardFooter :year="project['year']" :links="project['links']" v-if="hasLinks" />
    </div>
</template>

<script setup>
import ProjectCardImage from './ProjectCardImage.vue'
import ProjectCardFooter from './ProjectCardFooter.vue'

// Props
const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
    long: {
        type: Boolean,
        default: false,
    },
})

const previewImage = computed(function () {
    const images = props['project'] && props['project']['images']
    return images && images.length ? images[0] : null
})

const showImageTop = computed(function () {
    return Boolean(previewImage.value && props['long'])
})

const showImageBottom = computed(function () {
    return Boolean(previewImage.value && !props['long'])
})

const hasSkills = computed(function () {
    const skills = props['project'] && props['project']['skills']
    return Boolean(skills && skills.length)
})

const hasLinks = computed(function () {
    const links = props['project'] && props['project']['links']
    return Boolean(links && links.length)
})

const formattedDescription = computed(function () {
    const project = props['project']
    if (!project || !project['description']) return ''

    const text = props['long'] ? project['description'] : project['summary']

    return text
        .split('<br>')
        .map(function (line) {
            return `<span class='block mb-2'>${line}</span>`
        })
        .join('')
})
</script>

<style scoped lang="scss">
@import '../../assets/css/tailwind.css';

.project-card {
    @apply transition-300 hover:shadow-lg;

    .project-title {
        h4 {
            font-size: 1rem;
        }
    }

    .project-description {
        p {
            @apply text-justify;
            font-size: 0.75rem;
            color: var(--color-background-7);
        }
    }
}
</style>
