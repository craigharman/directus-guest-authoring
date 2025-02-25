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
</script>

<template>
	<h1>New</h1>
	{{ postFields }}
	<form>
		<DirectusFormElement v-for="field in postFields" :key="field.field" :field="field" />
	</form>
</template>

<style scoped>
form {
	display: flex;
	flex-wrap: wrap;
	width: 400px;
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