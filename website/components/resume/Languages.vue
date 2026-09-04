<template>
  <div class="languages noselect">
    <template v-for="language in state['languages']" :key="language['_id']">
      <div class="wheel" :title="`${language['name']}: ${language['proficiency']} proficiency`">
        <template v-for="skill in SKILLS" :key="skill">
          <div class="progress-circle" :class="skill" :style="{ '--value': level(language, skill) }" :title="`${skill}: ${language[skill] || 0}%`"></div>
        </template>

        <div class="flag">
          <Icon v-if="language['flag']" :name="language['flag']" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { LANGUAGES_QUERY_RESULT } from '~~/sanity.types'

type Language = LANGUAGES_QUERY_RESULT[number]

const SKILLS = ['reading', 'speaking', 'writing', 'listening'] as const

const { data: languages } = await useSanityQuery<LANGUAGES_QUERY_RESULT>(LANGUAGES_QUERY)

// State
const state = reactive<{ mounted: boolean; unmount: boolean; languages: Language[] }>({
  mounted: false,
  unmount: false,

  languages: [],
})

// Stored as 0 to 100 in the Studio; the wheels take 0 to 1
function level(language: Language, skill: (typeof SKILLS)[number]) {
  return (language[skill] || 0) / 100
}

// Lifecycle
onBeforeMount(function () {
  state['languages'] = languages.value || []
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
@import '../../assets/css/tailwind.css';

.languages {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;

  .wheel {
    @apply transition-500 shadow-lg;

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
        --color: hsl(120deg, 50%, 50%);
        --size-multiplier: 1;
      }

      &.speaking {
        --color: hsl(0deg, 50%, 50%);
        --size-multiplier: 0.85;
      }

      &.writing {
        --color: hsl(240deg, 50%, 50%);
        --size-multiplier: 0.725;
      }

      &.listening {
        --color: hsl(60deg, 50%, 50%);
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
