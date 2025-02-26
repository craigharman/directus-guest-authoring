<script setup lang="ts">

const { $directus, $readFieldsByCollection } = useNuxtApp()

const { data, error } = await useAsyncData('posts', async () => {
	return $directus.request($readFieldsByCollection('posts'))
})

if (error.value || data.value === null || data.value.length === 0) {
	console.error(error)
	throw createError({
		statusCode: 404,
		statusMessage: "Page not found"
	})
}

const postFields = data

const form = ref({})

const submitForm = async () => {
	console.log(form.value)
	// field.meta.validation
	// "validation": { "_and": [ { "slug": { "_regex": "^[a-z0-9]+(?:-[a-z0-9]+)*$" } } ] }, "validation_message": "Slug must use URL valid characters" } }
	// const response = await $directus.items('posts').create(form.value)
	// console.log(response)
}
</script>

<template>
	<h1>New Post</h1>
	<form @submit.prevent="submitForm">
		<DirectusFormElement v-for="field in postFields" :key="field.field" :field="field"
			v-model="form[field.field]" />
		<button type="submit">Submit</button>
	</form>
</template>

<style scoped>
form {
	display: flex;
	flex-wrap: wrap;
	width: 400px;
}

button {
	margin-top: 1em;
}
</style>

<style>
label {
	display: block;
	margin-top: 0.5em;
	margin-bottom: 0.2em;
}

select {
	width: 100%;
}
</style>