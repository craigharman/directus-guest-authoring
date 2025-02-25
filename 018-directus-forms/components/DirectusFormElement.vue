<script setup lang="ts">

import type { DirectusField } from '@directus/sdk'
import Input from './Input.vue'
import TextArea from './TextArea.vue'
import Select from './Select.vue'
import DateTime from './DateTime.vue'

const props = defineProps<{
	field: DirectusField
}>()

const fieldLookup = computed(() => {
	switch (props.field.meta.interface) {
		case 'input':
			return Input
		case 'input-rich-text-md':
			return TextArea
		case 'select-dropdown':
			return Select
		case 'datetime':
			return DateTime
		default:
			return Input
	}
})
</script>

<template>
	<component v-if="!field.meta.hidden" :key="field.field" :is="fieldLookup" :field="field.field"
		:width="field.meta.width" :defaultValue="field.schema.default_value" :label="field.meta.field"
		:options="field.meta.options" :required="field.meta.required" />
</template>