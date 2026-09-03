<template>
    <div class="project-footer">
        <div class="project-year">
            {{ year }}
        </div>

        <div class="project-links">
            <template v-for="link in normalizedLinks" :key="link['icon']">
                <div class="project-link ms-2">
                    <span :title="link['title']">
                        <component :is="link['tag']" v-bind="link['attrs']">
                            <Icon :name="link['icon']" class="fix" />
                        </component>
                    </span>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
// Props
const props = defineProps({
    year: {
        type: Number,
        default: null,
    },
    links: {
        type: Array,
        default: () => [],
    },
})

// Resolve each link's tag, tooltip, and anchor attributes ahead of time so the
// template loop is branch-free
const normalizedLinks = computed(function () {
    return props['links'].map(function (link) {
        const hasUrl = Boolean(link['link'])

        return {
            icon: link['icon'],
            title: link['title'] || (hasUrl ? 'Check project' : 'Not published'),
            tag: hasUrl ? 'a' : 'span',
            attrs: hasUrl ? { href: link['link'], target: '_blank', rel: 'noopener noreferrer' } : {},
        }
    })
})
</script>

<style scoped lang="scss">
@import '../../assets/css/tailwind.css';

.project-footer {
    @apply flex justify-between items-end;

    .project-year {
        font-size: 0.75rem;
    }

    .project-links {
        @apply flex;

        .project-link {
            font-size: 2rem;

            a {
                @apply transition-300;

                &:hover {
                    color: var(--color-primary);
                }
            }
        }
    }
}
</style>
