<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
const route = useRoute()

const { data, error } = await useAsyncData('post', async () => {
	return $directus.request($readItems('posts', {
		fields: ['id', 'title', 'slug', 'published_at', 'image.title', 'image.id', 'description'],
		filter: { published_at: { _empty: false } },
		sort: ['sort'],
	}))
})

const emit = defineEmits(['navigated'])
onMounted(() => {
	emit('navigated', null)
})
</script>
<template>
	<div v-if="data">
		<div v-for="post in data" :key="post.id">
			<Post v-bind="post" @navigated="emit('navigated', $event)" />
		</div>
	</div>
	<div v-else>Loading...</div>
</template>

<style scoped>
div {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
}

div > div {
	flex: 1 1 300px;
}
</style>