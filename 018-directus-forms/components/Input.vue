<script setup lang="ts">
const props = defineProps<{
	defaultValue?: string
	label?: string
	options: Record<string, any> | null
	width: string | null
	field: string
	required: boolean
	modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const fieldWidth = props.width === 'full' ? '100%' : '50%'

// Create a computed property for two-way binding
const inputValue = computed({
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
		<input :name="field" v-model="inputValue" type="text" :required="required" />
	</div>
</template>

<style scoped>
input {
	width: 100%;
}
</style>