<script setup lang="ts">
const props = defineProps<{
	defaultValue?: string
	label?: string
	width: string | null
	field: string
	required: boolean
}>()

const fieldWidth = props.width === 'full' ? '100%' : '50%'

</script>
<template>
	<label for="field">{{ label }}</label>
	<input :name="field" :value="defaultValue" type="datetime-local" :style="'width: ' + fieldWidth + ';'" />
</template>