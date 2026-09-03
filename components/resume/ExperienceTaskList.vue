<template>
    <div class="tasks m-0">
        <div class="mt-4" v-for="task in tasks" :key="task">
            <h6 class="font-medium text-[#60C060] m-0" v-if="task.title">
                {{ task.title }}
            </h6>

            <template v-for="subtask in task.text" :key="subtask">
                <ul class="list-disc list-outside text-black">
                    <li :class="task.title && task.text.length < 2 ? 'text-transparent ml-4' : 'text-black ml-8'">
                        <!-- hardcoded content from data/experience.js only — do not pipe user input here -->
                        <span class="text-black" v-html="subtask"></span>
                    </li>
                </ul>
            </template>

            <template v-if="task.skills">
                <div class="ml-5">
                    <template v-for="skill in task.skills" :key="skill">
                        <div class="badge mr-1">
                            {{ skill }}
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
defineProps({
    tasks: {
        type: Array,
        required: true,
    },
})
</script>
