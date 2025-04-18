<script setup lang="ts">
import { UInput } from '#components';
const { $directus, $createItem } = useNuxtApp()

const props = defineProps<{
	id: string;
	headline: string;
	tagline: string;
	form: FormElement;
}>()

const directusToNuxtUI = (field: FormField) => {
	switch (field.type) {
		case 'text':
			return UInput
	}
}

const state = reactive({
  items: props.form.fields,
})

const onSubmit = (event: Event) => {
	event.preventDefault()
	const formData = new FormData(event.target as HTMLFormElement)
	const data = Object.fromEntries(formData.entries())
	// $directus.request($createItem('form_submissions', {
	// 	form: props.form.id,
	// 	values: []
	// }))
}

</script>
<template>
	<RichText
		:id="id"
		:tagline="tagline"
		:headline="headline"
		:content="''"
		alignment="center"
	/>
	<UForm
		:id="id"
		:form="form"
		:fields="form.fields"
		:submitLabel="form.submit_label"
		:successMessage="form.success_message"
		:state="state"
		@submit="onSubmit"
		class="-mt-36 mx-auto max-w-sm"
	>
		<UFormField v-for="field in form.fields" :key="field.id" :label="field.label" :name="field.name">
			<component :is="directusToNuxtUI(field)" v-bind="field"></component>
		</UFormField>

		<UButton type="submit">
		{{ form.submit_label }}
		</UButton>
	</UForm>
</template>