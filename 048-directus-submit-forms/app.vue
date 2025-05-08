<script setup lang="ts">
import { createItem, readItem, type QueryItem } from '@directus/sdk';

const { $directus } = useNuxtApp()

const formId = "5da3d356-d818-434f-b225-db35c418bbb6"
const form: Ref<Form | undefined> = ref()
const name = ref('');
const email = ref('')


$directus.request(readItem('forms', formId, {
  fields: ['*', 'fields.*']}))
  .then((response) => {
    console.log('Form data:', response);
    form.value = response;
  })
  .catch((error) => {
    console.error('Error fetching form data:', error);
  });

const fields: Ref<FormSubmissionItem[]> = ref([])

const submit = () => {
  $directus.request(createItem('form_submissions', {
    form: formId,
    values: fields.value
  }))
}
</script>

<template>
    <form v-if="form" @submit.prevent="submit">
      <!-- TODO: How to use a single object to save v-models???? -->
      <div v-for="(field, index) in form.fields" :key="index">
        <label :for="field.name">{{ field.label }}</label>
        <input :name="field.name" v-model="field.value" />
      </div>
      <button type="submit">Submit</button>
    </form>
</template>
