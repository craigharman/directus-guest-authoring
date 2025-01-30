<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
const route = useRoute()
const page: Ref<Page | null> = ref(null)

const { data, error } = await useAsyncData('post', async () => {
	const slugParam = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
	return $directus.request($readItems('pages', {
		filter: {
			slug: { _eq: slugParam },
		},
		fields: ['title', 'slug', 'blocks.id', 'blocks.collection', 'blocks.item.*'],
		limit: 1
	}))
})

if (error.value || data.value === null || data.value.length === 0) {
	console.error(error)
	throw createError({
		statusCode: 404,
		statusMessage: "Page not found"
	})
}

page.value = data.value[0]
</script>
<template>
	<Page v-if="page" :title="page.title" :blocks="page.blocks"></Page>
	<div v-else>Loading...</div>
</template>