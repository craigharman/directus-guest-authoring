<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { $directus, $readItems } = useNuxtApp()

const { data, error } = await useAsyncData('navigation', async () => {
	return $directus.request($readItems('navigation', {
		fields: ['id', 'title', 'items.*', 'items.children.*'],
		filter: { id: { _eq: 'footer' } },
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
  <USeparator type="solid" class="h-px mt-12" />
  <UFooter>
    <template #left>
      <p class="text-(--ui-text-muted) text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        icon="i-simple-icons-discord"
        color="neutral"
        variant="ghost"
        to="https://directus.chat/"
        target="_blank"
        aria-label="Discord"
      />
      <UButton
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        to="https://x.com/directus"
        target="_blank"
        aria-label="X"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/directus/directus"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>