<script setup lang="ts">
defineProps<{
	id: string,
	headline: string,
	content: string,
	group_type: string,
	posts: Post[],
	cards: Card[]
}>()
</script>
<template>
	<h2>{{ headline }}</h2>
	<div v-html="content"></div>
	<div v-if="group_type === 'posts'" v-for="post in posts" :key="post.id">
		<h2>{{ post.title }}</h2>
		<div v-html="post.content"></div>
	</div>
	<div v-if="group_type === 'custom'" v-for="card in cards" :key="card.id">
		<h2>{{ card.image }}</h2>
		<p>{{ card.content }}</p>
	</div>
</template>