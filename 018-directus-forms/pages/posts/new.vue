<script setup lang="ts">

const { $directus, $readFieldsByCollection, $createItem } = useNuxtApp()

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
const formError: Ref<string | null> = ref(null)
const formSuccess: Ref<string | null> = ref(null)

const submitForm = async () => {
	formError.value = null
	formSuccess.value = null
	// Validate form data against field validation rules
	for (const field of postFields.value) {
		if (field.meta?.validation) {
			try {
				const validation = field.meta.validation
				if (validation._and) {
					for (const rule of validation._and) {
						const fieldName = Object.keys(rule)[0]
						if (rule[fieldName]._regex) {
							const regex = new RegExp(rule[fieldName]._regex)
							if (!regex.test(form.value[field.field])) {
								formError.value = field.meta.validation_message || field.meta.field + ' failed validation'
								console.error(`Validation failed for ${field.field}: ${field.meta.validation_message || 'Invalid format'}`)
								return // Stop submission if validation fails
							}
						}
					}
				}
			} catch (err) {
				console.error(`Error parsing validation for ${field.field}:`, err)
			}
		}
	}

	const result = await $directus.request($createItem('posts', form.value))
	if (result.error) {
		formError.value = result.error.message
		console.error('Error creating post:', result.error)
		return // Stop submission if error occurs
	}
	formSuccess.value = 'Post created successfully'
}
</script>

<template>
	<h1>New Post</h1>
	<div v-if="formError" class="error">{{ formError }}</div>
	<div v-else-if="formSuccess" class="success">{{ formSuccess }}</div>
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

.error {
	color: red;
}

.success {
	color: green;
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