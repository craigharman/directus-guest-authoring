<script setup lang="ts">

import { defineProps } from 'vue'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: Object,
		required: true,
	},
	content: {
		type: String,
		required: false,
	}
})

const { id, title, description, image } = props
</script>

<template>
	<div :class="content ? 'article' : 'card'">
		<img :src="`/directus/assets/${image.id}`" :alt="image.title" />
		<h2>{{ title }}</h2>
		<div v-if="content">
			<div v-html="content"></div>
		</div>
		<div v-else>				
			<p>{{ description }}</p>
			<NuxtLink :to="`/posts/${slug}`">Read more</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
.card {
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	transition: transform 0.3s ease;
	background-color: #fff;
	max-width: 350px;
	margin: 1rem;
	position: relative;
}

.card:hover {
	transform: translateY(-5px);
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card img {
	width: 100%;
	height: 200px;
	object-fit: cover;
	display: block;
}

.card h2 {
	margin: 1rem;
	font-size: 1.5rem;
	color: #333;
}

.card p {
	margin: 0 1rem 1rem;
	color: #666;
	line-height: 1.4;
}

.card a {
	display: inline-block;
	margin: 0 1rem 1rem;	
}
</style>