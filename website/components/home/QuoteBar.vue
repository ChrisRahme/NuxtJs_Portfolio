<template>
  <p v-if="state['quote']" id="quote" class="wrap">
    <button type="button" class="quote-button" title="Another one" @click="changeQuote">
      <span class="text">{{ state['quote'] }}</span>
    </button>
  </p>
</template>

<script setup lang="ts">
import type { QUOTES_QUERY_RESULT } from '~~/sanity.types'

const { data: quotes } = await useSanityQuery<QUOTES_QUERY_RESULT>(QUOTES_QUERY)

const texts = computed(function () {
  return (quotes.value || [])
    .map(function (quote) {
      return quote['text'] || ''
    })
    .filter(Boolean)
})

// State
const state = reactive<{ quote: string | null }>({
  quote: null,
})

// Methods
function changeQuote() {
  const list = texts.value
  if (!list.length) {
    return
  }

  const oldQuote = state['quote']
  const index = Math.floor(Math.random() * list.length)
  const newQuote = list[index] || null

  if (oldQuote === newQuote && list.length > 1) {
    changeQuote()
  } else {
    state['quote'] = newQuote
  }
}

// Lifecycle
onMounted(function () {
  changeQuote()
})
</script>

<style scoped lang="scss">
#quote {
  margin-block: 0;
  padding: 0.5rem 0 1.25rem;

  .quote-button {
    appearance: none;
    margin: 0;
    padding: 0.25rem 0;
    border: 0;
    background: none;
    font: inherit;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    line-height: 1.5;
    text-align: left;
    color: var(--star-dim);
    cursor: pointer;
    transition: color 300ms ease;

    @media (width >= 640px) {
      font-size: 0.75rem;
    }

    &:hover {
      color: var(--star);
    }

    &:focus-visible {
      outline-color: var(--green-light);
    }
  }
}
</style>
