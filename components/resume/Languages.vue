<template>
    <div class="languages noselect">
        <template v-for="language in state['languages']" :key="language['language']">
            <div class="wheel" :title="`${language['language']}: ${language['proficiency']} proficiency`">
                <template v-for="skill in ['reading', 'speaking', 'writing', 'listening']" :key="skill">
                    <div class="progress-circle" :class="skill" :style="{ '--value': language[skill] }" :title="`${skill}: ${language[skill] * 100}%`"></div>
                </template>

                <div class="flag">
                    <Icon :name="language.flag" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
// Props
const props = defineProps({})

// State
const state = reactive({
    mounted: false,
    unmount: false,

    languages: [],
})

// Lifecycle
onBeforeMount(function () {
    const store = useGlobalStore()

    state['languages'] = store['languages']
})

onMounted(function () {
    state['mounted'] = true
})

onBeforeUnmount(function () {
    state['unmount'] = true
})
</script>

<style lang="scss" scoped>
@use 'sass:color' as color;
@import '/assets/css/tailwind.css';

.languages {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2rem;

    .wheel {
        @apply shadow-lg transition-500;

        --base-size: 6rem;

        position: relative;
        width: var(--base-size);
        height: var(--base-size);

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: white;
        border-radius: 50%;

        &:hover {
            @apply scale-110 shadow-xl;

            .progress-circle {
                transform: rotateY(180deg) rotateZ(calc(360deg - var(--value) * 360deg));
            }

            .flag {
                transform: scale(1.25);
            }
        }

        .progress-circle {
            @apply transition-1000;

            position: absolute;

            &.reading {
                --color: hsl(120, 50%, 50%);
                --size-multiplier: 1;
            }

            &.speaking {
                --color: hsl(0, 50%, 50%);
                --size-multiplier: 0.85;
            }

            &.writing {
                --color: hsl(240, 50%, 50%);
                --size-multiplier: 0.725;
            }

            &.listening {
                --color: hsl(60, 50%, 50%);
                --size-multiplier: 0.62;
            }

            --size: calc(var(--base-size) * var(--size-multiplier));
            width: var(--size);
            height: var(--size);

            border-radius: 50%;

            background: radial-gradient(closest-side, white 0% 85%, transparent 85% 100%), conic-gradient(var(--color) calc(var(--value) * 100%), transparent 0);

            transform: rotateY(180deg);
        }

        .flag {
            @apply transition-1000;

            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: calc(var(--base-size) * 1 / 3);
        }
    }
}
</style>
