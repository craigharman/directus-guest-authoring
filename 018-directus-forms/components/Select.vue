<script setup lang="ts">
const props = defineProps<{
	defaultValue?: string
	label?: string
	options: Record<string, any>
	width: string | null
	field: string
	required: boolean
}>()

const fieldWidth = props.width === 'full' ? '100%' : '50%'

</script>
<template>
	<div :style="'width: ' + fieldWidth + ';'">
		<label for="field">{{ label }}</label>
		<select :name="field" :value="defaultValue" type="text">
			<option v-for="choice in options.choices" :key="choice.value" :value="choice.value">{{ choice.text }}
			</option>
		</select>
	</div>
</template>