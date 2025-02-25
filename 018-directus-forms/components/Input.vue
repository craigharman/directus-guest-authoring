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
	<div :style="'width: ' + fieldWidth + ';'">
		<label for="field">{{ label }}</label>
		<input :name="field" :value="defaultValue" type="text" :required="required" />
	</div>
</template>

<style scoped>
input {
	width: 100%;
}
</style>