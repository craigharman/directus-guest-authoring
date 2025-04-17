<script setup lang="ts">

defineProps({
	breadcrumbs: {
		type: Array as () => Array<{ text: string; href: string }>,
		required: true,
	},
})

</script>
<template>
	<div>
		<span v-for="link in breadcrumbs" :key="link.href">
			<template v-if="$route.path === link.href">
				<span>{{ link.text }}</span>
			</template>
			<template v-else>
				<NuxtLink :to="link.href">{{ link.text }}</NuxtLink>
			</template>
			<span v-if="link !== breadcrumbs[breadcrumbs.length - 1]"> / </span>
		</span>
	</div>
</template>

<style scoped>
div {
	margin-bottom: 16px;
}
</style>