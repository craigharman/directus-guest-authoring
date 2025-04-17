<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
const route = useRoute()
const post: Ref<Post | null> = ref(null)

const { data, error } = await useAsyncData('post', async () => {
	const slugParam = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
	return $directus.request($readItems('posts', {
		filter: {
			slug: { _eq: slugParam },
		},
		fields: ['id', 'title', 'slug', 'author', 'published_at', 'image.title', 'image.id', 'description', 'content', 'seo.title', 'seo.meta_description'],
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

post.value = data.value[0]
</script>
<template>
	<Post v-if="post" v-bind="post" />
	<div v-else>Loading...</div>
</template>