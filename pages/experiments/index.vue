<template>
    <div>
        <h1>Experiments</h1>

        <div class="grid grid-cols-4 gap-10">
            <!-- <NuxtLink to="/experiments/caustics" class="btn shadow-md bg-white">
			</div> -->
            <template v-for="experiment in experiments" :key="experiment['title']">
                <template v-if="!experiment['hidden']">
                    <NuxtLink :to="`/experiments/${experiment['id']}`" class="card transition flex flex-col justify-center items-center">
                        <h2 class="title">{{ experiment['title'] }}</h2>
                        <!-- <small>{{ experiment.description }}</small> -->
                    </NuxtLink>
                </template>
            </template>
        </div>
    </div>
</template>

<script setup>
const experiments = [
    {
        id: 'caustics',
        title: 'Caustics',
        image: '',
        description: 'Experiment with light rays of different colors passing through a raindrop to understand rainbows.',
        hidden: true,
    },
]
</script>

<style scoped lang="scss">
.card {
    height: 100px;

    &:hover {
        @apply shadow-xl;
    }

    .title {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }
}
</style>
