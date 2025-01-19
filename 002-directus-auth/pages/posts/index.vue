<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()

const { data, error } = await useAsyncData('post', async () => {
	try {
		return await $directus.request(
			$readItems('posts')
		)
	} catch (errror) {
		console.error(error)
	}
})
</script>
<template>
	<div v-for="post in data">
		<h2>{{ post.title }}</h2>
	</div>
</template>