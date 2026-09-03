<template>
    <div id="quote" class="hidden md:block" v-if="state['quote']">
        <div class="pt-8 bg-9"></div>

        <div class="bg-8" @click="changeQuote">
            <div class="container mx-auto py-8 flex justify-center content-center items-center text-white cursor-pointer">
                <Icon name="mdi:format-quote-open" class="text-8xl text-[#60C060]" />

                <p class="text-2xl text-center w-full italic" style="max-width: 45vw">
                    <span>
                        {{ state['quote'] }}
                    </span>
                    <span
                        id="squiggle"
                        :title="`[/src/pages/index.vue] SyntaxError: Unexpected end of quote; expected '”' at position ${state.quote.length}. (This is on purpose)`"
                    >
                        &nbsp;&nbsp;
                    </span>
                </p>
            </div>
        </div>

        <div class="pb-0 bg-0"></div>
    </div>
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
@import '../../assets/css/tailwind.css';

#quote {
    @apply transition-300;

    position: relative;
    z-index: 1;

    &:hover {
        .iconify {
            transform: scale(1.1) rotateZ(-1.5deg);
        }
    }

    #squiggle {
        --fs: 1rem;

        border-bottom: 2px dotted red;
        display: inline-block;
        position: relative;

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: calc(50% + var(--fs) - 1px);
            left: -2px;
            width: 100%;
            height: 4px;
            font-size: var(--fs);
            border-bottom: 2px dotted red;
        }
    }

    .iconify {
        @apply transition-300;
    }

    .bg-0 {
        background-color: var(--color-background-0);
    }

    .bg-8 {
        background-color: var(--color-background-8);
    }

    .bg-9 {
        background-color: var(--color-background-9);
    }
}
</style>
