<template>
    <div id="error" class="flex flex-col justify-center items-center h-screen noselect" v-if="state['title']">
        <h1 id="title" class="text-[#C06060] font-mono font-bold">
            {{ state['title'] }}
        </h1>

        <p id="message" class="text-[#C0C060] font-mono">
            {{ state['message'] }}
        </p>

        <!-- <NuxtLink to="/" id="button" class="btn w-52 p-4 flex justify-center items-center"> Go to Home </NuxtLink> -->
        <button id="button" class="btn w-52 p-4 flex justify-center items-center rounded-lg" @click="goHome">Home</button>
    </div>
</template>

<script setup>
const props = defineProps({
    error: Object,
})

const state = reactive({
    title: null,
    message: null,
})

function goHome() {
    clearError({ redirect: '/' })
}

onMounted(function () {
    state['title'] = props['error']['statusCode'] || 'Oops!'
    state['message'] = props['error']['message'] || 'Something went wrong.'
})
</script>

<style lang="scss" scoped>
#error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #c06060, #c0c060, #c06060);
    background-size: 500% 500%;
    animation: gradient 30s ease infinite;

    #title {
        font-size: 14rem;
        line-height: 12rem;
        margin: 0;
    }

    #message {
        font-size: 1.5rem;
        line-height: 1.5rem;
        margin-bottom: 4rem;
        animation: gradient 30s ease infinite;
    }

    #button {
        font-size: 1.75rem;
        line-height: 1.75rem;
        background-color: #ffffff44;
        border: 2px solid #60c060;
        color: #60c060;
        animation: breathe 5s ease infinite reverse;

        &:hover {
            background-color: #60c060bb;
            border: 2px solid transparent;
            color: #ffffff;
            animation: none;
        }
    }
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
        color: #c0c060;
    }
    50% {
        background-position: 100% 50%;
        color: #c06060;
    }
    100% {
        background-position: 0% 50%;
        color: #c0c060;
    }
}

@keyframes breathe {
    0% {
        transform: scale(1) rotate(-1deg);
    }
    50% {
        transform: scale(1.05) rotate(1.05deg);
    }
    100% {
        transform: scale(1) rotate(-1deg);
    }
}
</style>
