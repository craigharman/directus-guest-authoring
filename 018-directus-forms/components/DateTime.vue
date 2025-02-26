<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	defaultValue?: string
	label?: string
	width: string | null
	field: string
	required: boolean
	options: Record<string, any> | null
	modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const fieldWidth = props.width === 'full' ? '100%' : '50%'

// Create a computed property for two-way binding
const dateTimeValue = computed({
	get() {
		return props.modelValue || props.defaultValue || ''
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
</script>

<template>
	<div :style="'width: ' + fieldWidth + ';'">
		<label for="field">{{ label }}</label>
		<input :name="field" v-model="dateTimeValue" type="datetime-local" :required="required" />
	</div>
</template>

<style scoped>
input {
	width: 100%;
}
</style>