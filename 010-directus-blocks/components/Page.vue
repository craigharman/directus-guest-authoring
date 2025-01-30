<script setup lang="ts">
import Hero from './Hero.vue'
import RichText from './RichText.vue'
import CardGroup from './CardGroup.vue'

defineProps<{
	title: String,
	blocks: Block[]
}>()

const blockToComponent = (collectionName: string) => {
	switch (collectionName) {
		case 'block_hero':
			return Hero
		case 'block_richtext':
			return RichText
		case 'block_cardgroup':
			return CardGroup
		default:
			return 'div'
	}
}
</script>
<template>

	<Head>
		<title>{{ title }}</title>
	</Head>
	<h1>{{ title }}</h1>
	<div v-for="block in blocks" :key="block.id">
		<component :is="blockToComponent(block.collection)" v-bind="block.item"></component>
	</div>
</template>