<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const { $directus, $readItems } = useNuxtApp()

const { data, error } = await useAsyncData('navigation', async () => {
	return $directus.request($readItems('navigation', {
		fields: ['id', 'title', 'items.*', 'items.children.*'],
		filter: { id: { _eq: 'main' } },
		limit: 1,
	}))
})

const items: ComputedRef<NavigationMenuItem[]> = computed(() => {
	if (!data.value || !data.value[0]?.items) return []
	
	function mapItem(item: NavigationItem): NavigationMenuItem {
		return {
			id: item.id,
			label: item.title,
			to: item.url ?? undefined,
			children: item.children ? item.children.map(mapItem) : undefined
		}
	}
	
	return data.value[0].items.map(mapItem)
})
</script>
<template>
	<UHeader title="Directus CMS">

	<UNavigationMenu content-orientation="vertical" :items="items" class="w-full justify-center" />

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
	
</template>