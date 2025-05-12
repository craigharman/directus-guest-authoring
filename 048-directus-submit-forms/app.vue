<script setup lang="ts">
import { createItem, readItem } from '@directus/sdk';

const { $directus } = useNuxtApp()

const formId = "5da3d356-d818-434f-b225-db35c418bbb6"
const form: Ref<Form | undefined> = ref()
const fields: Ref<FormSubmissionItem[]> = ref([])

$directus.request(readItem('forms', formId, {
  fields: ['*', 'fields.*']
}))
  .then((response) => {
    form.value = response;
    // Initialize fields for submission
    fields.value = response.fields.map((field: FormField) => ({
      field: field.id,
      value: ''
    }));
  })
  .catch((error) => {
    console.error('Error fetching form data:', error);
  });

const success = ref(false)
const error: Ref<string | undefined> = ref()
const submit = () => {
  $directus.request(createItem('form_submissions', {
    form: formId,
    values: fields.value
  }))
  .then(() => {
    success.value = true
    error.value = undefined
    // Reset form
    fields.value = form?.value?.fields.map((field: FormField) => ({
      field: field.id,
      value: ''
    }));
  })
  .catch((error) => {
    error.value = error.message
  })
}
</script>

<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <form v-if="form" @submit.prevent="submit">
      <div v-if="success">{{ form.success_message }}</div>
      <div v-else>
        <div v-for="(field, index) in form.fields" :key="field.id">
          <label :for="field.name">{{ field.label }}</label>
          <input
            :name="field.name"
            v-model="fields[index].value"
            :required="field.required"
            :placeholder="field.placeholder"
          />
        </div>
        <button type="submit">Submit</button>
      </div>
      
    </form>
  </div>
</template>
