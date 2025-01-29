<script setup lang="ts">
const { $directus, $readItems, $logout, $isAuthenticated } = useNuxtApp()
import { deleteItem } from '@directus/sdk'
const deleteSuccessful = ref(false)

const { data, error } = await useAsyncData('post', async () => {
	try {
		return await $directus.request(
			$readItems('posts', {
				fields: ['id', 'title', 'content', 'user_created']
			})
		)
	} catch (error) {
		console.error(error)
	}
})

const authUser = await $isAuthenticated()
if (authUser === false) {
	throw new Error('Not authenticated')
}

const deletePost = async (id: number | string) => {
	try {
		await $directus.request(
			deleteItem('posts', id)
		)
		data.value = data.value?.filter(post => post.id !== id)
		deleteSuccessful.value = true
	} catch (error) {
		console.error(error)
	}
}
</script>
<template>
	<h1>Posts</h1>
	<p v-if="deleteSuccessful">Post deleted successfully</p>
	<div v-for="post in data">
		<h2>{{ post.title }}</h2>
		<button v-if="authUser.id === post.user_created" @click="deletePost(post.id)">Delete</button>
		<hr />
	</div>
	<button @click="$logout()">Logout</button>
</template>