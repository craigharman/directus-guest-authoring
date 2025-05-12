<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import { setAttr } from '@directus/visual-editing'

const props = defineProps<{
	id: string,
	tagline: string,
	headline: string,
	description: string,
	button_group?: ButtonGroup,
	image: Image,
}>()

const links: Ref<ButtonProps[]> = ref([])

if (props.button_group) {
	for (const button of props.button_group.buttons) {
		links.value.push({
			label: button.label,
			to: button.url || '/',
			variant: (button.variant === "default" ? "solid" : button.variant) as ButtonProps['variant'],
		})
	}
}
</script>
<template>
	<UPageHero
		:data-directus="setAttr({ collection: 'block_hero', item: id, fields: 'tagline, headline, description, button_group, image',
    mode: 'drawer' })"
    	:title="headline"
    	:description="description"
    	:headline="tagline"
		:links="links"
		orientation="horizontal"
  	>
	  <img
		:src="'/directus/assets/' + image.id"
		:alt="image.title || ''"
		class="rounded-lg shadow-2xl ring ring-(--ui-border)"
    	/>
	</UPageHero>
</template>