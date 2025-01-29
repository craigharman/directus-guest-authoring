<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
const route = useRoute()
const post: Ref<Post | null> = ref(null)

const { data, error } = await useAsyncData('post', async () => {
	const slugParam = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
	const languageCode = Array.isArray(route.params.lang) ? route.params.lang[0] : route.params.lang

	const defaultData = await $directus.request($readItems('posts', {
		filter: {
			slug: { _eq: slugParam },
		},
		fields: ['id', 'title', 'content'],
		limit: 1
	}))
	if (languageCode === 'en-US') {
		return defaultData
	}
	const translatedData = await $directus.request($readItems('posts_translations', {
		filter: {
			posts_id: { _eq: 1 },
			languages_code: { _eq: languageCode }
		},
		fields: ['id', 'title', 'content'],
		limit: 1
	}))
	return translatedData
})

if (error.value || data.value === null || data.value.length === 0) {
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