<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
const route = useRoute()
const page: Ref<Page | undefined> = ref()

const { data, error } = await useAsyncData('page', async () => {
	return $directus.request($readItems('pages', {
		fields: ['id', 'title', 'permalink', 'published_at', 'seo', 'blocks.collection', 'blocks.item.*', 'blocks.item.image.*', 'blocks.item.button_group.buttons.*', 'blocks.item.items.*', 'blocks.item.pricing_cards.*', 'blocks.item.pricing_cards.button.*', 'blocks.item.form.*', 'blocks.item.form.fields.*'],
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
		default:
			return 'div'
	}
}
</script>
<template>
	 <UContainer class="mt-8">
		<div v-if="page" class="prose dark:prose-invert">
			<h1>{{ page.title }}</h1>
			<div v-for="block in page.blocks" :key="block.id">
				<component :is="blockToComponent(block.collection)" v-bind="block.item"></component>
			</div>
		</div>
		<div v-else>Loading...</div>
	</UContainer>
</template>