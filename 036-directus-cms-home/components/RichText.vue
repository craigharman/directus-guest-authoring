<script setup lang="ts">
defineProps<{
	id: string,
	tagline: string,
	headline: string,
	content: string,
	alignment: string
}>()
</script>
<template>
	<UPageHero
		:title="headline"
		:headline="tagline">
		<template #description>
			<div v-html="content"></div>
		</template>
	</UPageHero>
</template>