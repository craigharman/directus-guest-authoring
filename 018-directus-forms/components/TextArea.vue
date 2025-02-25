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
	<textarea :name="field" :value="defaultValue" :style="'width: ' + fieldWidth + ';'" rows="12"
		:required="required" />
</template>

<style scoped>
textarea {
	width: 90%;
}
</style>