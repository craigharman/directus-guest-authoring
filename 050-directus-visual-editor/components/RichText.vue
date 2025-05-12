<script setup lang="ts">
import { setAttr } from '@directus/visual-editing'
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
		:data-directus="setAttr({
			collection: 'block_richtext', item: id, fields: 'tagline, headline, content', mode: 'drawer'
		})"
		:title="headline"
		:headline="tagline">
		<template #description>
			<div v-html="content"></div>
		</template>
	</UPageHero>
</template>