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
	{{ postFields }}
	<div style="width: 400px;">
		<form>
			<DirectusFormElement v-for="field in postFields" :key="field.field" :field="field" />
		</form>
	</div>
</template>