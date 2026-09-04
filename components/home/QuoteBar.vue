<template>
    <p id="quote" class="wrap" v-if="state['quote']">
        <button type="button" class="quote-button" @click="changeQuote" title="Another one">
            <span class="text">{{ state['quote'] }}</span>
        </button>
    </p>
</template>

<script setup>
import { quotes } from '~/data/quotes'

// State
const state = reactive({
    quote: null,
})

// Methods
function changeQuote() {
    const oldQuote = state['quote']
    const index = Math.floor(Math.random() * quotes.length)
    const newQuote = quotes[index]

    if (oldQuote === newQuote && quotes.length > 1) {
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
