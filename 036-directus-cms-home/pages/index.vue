<script setup lang="ts">
import Hero from '../components/Hero.vue'
import RichText from '../components/RichText.vue'
import Gallery from '../components/Gallery.vue'

const { $directus, $readItems } = useNuxtApp()
const route = useRoute()
const page: Ref<Page | undefined> = ref()

const { data, error } = await useAsyncData('page', async () => {
	return $directus.request($readItems('pages', {
		fields: ['id', 'title', 'permalink', 'published_at', 'blocks.*', 'blocks.item.*', 'blocks.item.image.*', 'blocks.item.button_group.buttons.*', 'blocks.*.items.*'],
		filter: { title: { _eq: 'Home' } },
	}))
})

if (error.value || !data.value) {
	console.error('Error fetching home page:', error.value)
} else {
	page.value = data.value[0]
}

const blockToComponent = (collectionName: string) => {
	switch (collectionName) {
		case 'block_hero':
			return Hero
		case 'block_richtext':
			return RichText
		case 'block_gallery':
			return Gallery
		default:
			return 'div'
	}
}
</script>
<template>
	 <UContainer class="mt-8">
		<div v-if="page">
			<div v-for="block in page.blocks" :key="block.id">
				<component :is="blockToComponent(block.collection)" v-bind="block.item"></component>
			</div>
		</div>
		<div v-else>Loading...</div>
	</UContainer>
</template>