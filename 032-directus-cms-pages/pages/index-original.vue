<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
const route = useRoute()

const { data, error } = await useAsyncData('post', async () => {
	return $directus.request($readItems('posts'))
})
</script>
<template>
	<h1>Directus Blog</h1>
	<div v-if="data">
		<div v-for="post in data" :key="post.id">
			<h2>{{ post.title }}</h2>
		</div>
	</div>
	<div v-else>Loading...</div>
</template>