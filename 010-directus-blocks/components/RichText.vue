<script setup lang="ts">
defineProps<{
	id: string,
	headline: string,
	content: string
}>()
</script>
<template>
	<h2>{{ headline }}</h2>
	<div v-html="content"></div>
</template>