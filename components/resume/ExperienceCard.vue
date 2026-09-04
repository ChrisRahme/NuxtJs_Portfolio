<template>
    <article class="card exp-card" :style="{ '--theme': item['color'] || 'var(--green)' }">
        <header class="exp-head">
            <div class="exp-main">
                <p class="eyebrow exp-dates">
                    <ExperienceDates :item="item" />
                </p>

                <h3 class="exp-title">{{ item['title'] }}</h3>

                <p class="exp-company">
                    <component :is="companyLink.tag" v-bind="companyLink.attrs" class="company-name">
                        <span>{{ item['company'] }}</span>
                        <Icon name="solar:link-bold" v-if="companyLink.isLink" />
                    </component>

                    <span class="exp-type" v-if="item['type']">{{ item['type'] }}</span>
                </p>
            </div>

            <component :is="companyLink.tag" v-bind="companyLink.attrs" class="exp-logo" v-if="item['image']">
                <NuxtImg :src="item['image']" :alt="`${item['company']} logo`" width="56" height="56" format="webp" />
            </component>
        </header>

        <p class="exp-desc" v-html="item['description']" v-if="item['description']"></p>

        <ExperienceTaskList :tasks="item['tasks']" v-if="item['tasks']" />
    </article>
</template>

<script setup>
import ExperienceDates from './ExperienceDates.vue'
import ExperienceTaskList from './ExperienceTaskList.vue'

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
})

const companyLink = computed(function () {
    const isLink = Boolean(props['item']['link'])

    return {
        isLink,
        tag: isLink ? 'a' : 'span',
        attrs: isLink
            ? {
                  href: props['item']['link'],
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  title: 'Visit website',
              }
            : {},
    }
})
</script>

<style lang="scss" scoped>
.exp-card {
    padding: clamp(1.25rem, 3vw, 2rem);
    box-shadow:
        inset 4px 0 0 var(--theme),
        var(--shadow-card);

    .exp-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .exp-main {
        min-width: 0;
    }

    .exp-dates {
        margin: 0 0 0.5rem;
        color: var(--green-ink);
    }

    .exp-title {
        margin: 0 0 0.25rem;
        font-family: var(--font-body);
        font-size: 1.25rem;
        font-weight: 600;
        letter-spacing: -0.01em;
        line-height: 1.25;
    }

    .exp-company {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.35rem 0.75rem;
        margin: 0;
        font-size: 0.9375rem;

        .company-name {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            color: var(--purple);
            font-weight: 600;
            text-decoration: none;

            .iconify {
                font-size: 0.8em;
                opacity: 0.7;
                transition: opacity 200ms ease;
            }

            &:hover .iconify {
                opacity: 1;
            }
        }

        .exp-type {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            letter-spacing: 0.06em;
            color: var(--ink-2);
        }
    }

    .exp-logo {
        flex: none;
        display: block;
        border-radius: 0.75rem;
        line-height: 0;

        img {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 0.75rem;
            object-fit: contain;
        }
    }

    .exp-desc {
        margin: 0;
        color: var(--ink);
    }
}
</style>
