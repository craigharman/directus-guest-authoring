<script setup lang="ts">
import Hero from '../components/Hero.vue'
import RichText from '../components/RichText.vue'
import Gallery from '../components/Gallery.vue'
import Pricing from '../components/Pricing.vue'
import Form from '../components/Form.vue'
import { apply } from '@directus/visual-editing'

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
		case 'block_hero':
			return Hero
		case 'block_richtext':
			return RichText
		case 'block_gallery':
			return Gallery
		case 'block_pricing':
			return Pricing
		case 'block_form':
			return Form
		default:
			return 'div'
	}
}

onMounted(() => {
	apply({ directusUrl: 'http://localhost:8055' });
})
</script>
<template>
	 <UContainer class="mt-8">
		<div v-if="page">
			<Head>
				<Title>{{ page.seo?.title || 'Directus CMS Post' }}</Title>
				<Meta name="description" :content="page.seo?.meta_description || ''" />
			</Head>
			<Header />
			<div v-for="block in page.blocks" :key="block.id">
				<component :is="blockToComponent(block.collection)" v-bind="block.item"></component>
			</div>
			<Footer />
		</div>
		<div v-else>Loading...</div>
	</UContainer>
</template>