<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	defaultValue?: string
	label?: string
	options: Record<string, any>
	width: string | null
	field: string
	required: boolean
	modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const fieldWidth = props.width === 'full' ? '100%' : '50%'

// Create a computed property for two-way binding
const selectValue = computed({
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
		<select :name="field" v-model="selectValue" :required="required">
			<option v-for="choice in options.choices" :key="choice.value" :value="choice.value">{{ choice.text }}
			</option>
		</select>
	</div>
</template>