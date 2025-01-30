<script setup lang="ts">
defineProps<{
	id: string,
	headline: string,
	content: string,
	buttons?: Button[]
	image: string,
}>()
</script>
<template>
	<h2>{{ headline }}</h2>
	<div v-html="content"></div>
	<div v-if="buttons">
		<button v-for="button in buttons" :key="button.label" :href="button.href" class="button"
			:class="button.variant">{{ button.label }}</button>
	</div>
</template>

<style scoped>
.button {
	background-color: grey;
	color: white;
}

.button.primary {
	background-color: green;
	color: white;
}

.button.outline {
	background-color: transparent;
	border: 1px solid black;
	color: black;
}
</style>