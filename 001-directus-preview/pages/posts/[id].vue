<script setup>
const { $directus, $readItem, $isPreview, $previewToken, $previewVersion, $withToken } = useNuxtApp()
const route = useRoute()
const post = ref(null)

if ($isPreview) {
	const { data, error } = await useAsyncData('post', async () => {
		try {
			return await $directus.request(
				$withToken($previewToken, $readItem('posts', route.params.id, { version: $previewVersion }))
			)
		} catch (error) {
			throw createError({
				statusCode: 404,
				statusMessage: "Post not found"
			})
		}
	})

	if (error.value) {
		throw createError({
			statusCode: 404,
			statusMessage: "Post not found"
		})
	}

	post.value = data.value
} else {
	const { data, error } = await useAsyncData('post', async () => {
		return $directus.request($readItem('posts', route.params.id))
	})

	if (error.value) {
		throw createError({
			statusCode: 404,
			statusMessage: "Post not found"
		})
	}

	post.value = data.value
}
</script>
<template>
	<div v-if="post">
		<h1>{{ post.title }}</h1>
		<p>{{ post.content }}</p>
	</div>
	<div v-else>Loading...</div>
</template>