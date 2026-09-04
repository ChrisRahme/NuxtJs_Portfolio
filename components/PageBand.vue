<template>
    <section class="band">
        <div class="wrap band-inner">
            <div class="band-main">
                <div class="band-media" v-if="$slots.media">
                    <slot name="media"></slot>
                </div>

                <div class="band-text">
                    <p class="eyebrow band-eyebrow" v-if="eyebrow">{{ eyebrow }}</p>
                    <h1 class="band-title">{{ title }}</h1>
                    <p class="band-lead" v-if="lead">{{ lead }}</p>
                    <slot></slot>
                </div>
            </div>

            <div class="band-aside" v-if="$slots.aside">
                <slot name="aside"></slot>
            </div>
        </div>
    </section>
</template>

<script setup>
defineProps({
    eyebrow: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        required: true,
    },
    lead: {
        type: String,
        default: '',
    },
})
</script>

<style scoped lang="scss">
.band {
    color: var(--star);
    background:
        radial-gradient(70% 60% at 50% 100%, rgba(201, 112, 92, 0.22) 0%, rgba(201, 112, 92, 0) 100%),
        linear-gradient(180deg, var(--sky-zenith) 0%, var(--sky-mid) 65%, var(--sky-dusk) 100%);
    padding-block: clamp(2.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 3.5rem);

    .band-inner {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1.5rem 3rem;
    }

    .band-main {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: clamp(1rem, 3vw, 2rem);
        flex: 1 1 24rem;
        min-width: 0;
    }

    .band-media {
        flex: none;
    }

    .band-text {
        flex: 1 1 16rem;
        min-width: 0;
    }

    .band-eyebrow {
        margin: 0 0 0.6rem;
        color: var(--green-light);
    }

    .band-title {
        margin: 0;
        font-size: var(--fs-h1);
        color: var(--star);
    }

    .band-lead {
        max-width: 34rem;
        margin: 0.75rem 0 0;
        font-size: var(--fs-lead);
        color: rgba(244, 239, 230, 0.78);
    }

    .band-aside {
        flex: none;
    }
}
</style>
