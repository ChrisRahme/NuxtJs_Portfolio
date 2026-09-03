<template>
    <span>
        <span>{{ item.start }}</span>
        <span v-if="item.end">&nbsp;-&nbsp;</span>
        <span v-if="item.end">{{ item.end }}</span>
    </span>
</template>

<script setup>
defineProps({
    item: {
        type: Object,
        required: true,
    },
})
</script>
