<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
const route = useRoute()
const post: Ref<Post | null> = ref(null)

const { data, error } = await useAsyncData('post', async () => {
	const slugParam = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
	return $directus.request($readItems('posts', {
		filter: {
			slug: { _eq: slugParam }
		},
		fields: ['id', 'title', 'content', 'slug', 'published'],
		limit: 1
	}))
})

if (error.value || data.value === null) {
	console.error(error)
	throw createError({
		statusCode: 404,
		statusMessage: "Post not found"
	})
}

post.value = data.value[0]
</script>
<template>
	<div v-if="post">
		<h1>{{ post.title }}</h1>
		<p>{{ post.content }}</p>
	</div>
	<div v-else>Loading...</div>
</template>