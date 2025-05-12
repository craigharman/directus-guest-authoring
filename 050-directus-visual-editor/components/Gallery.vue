<script setup lang="ts">
import { setAttr } from '@directus/visual-editing'

const props = defineProps<{
  id: string
  tagline: string
  headline: string
  items: GalleryItem[]
}>()

type GalleryItem = {
	id: string;
	block_gallery: string;
	directus_file: string;
	sort: number;
}
</script>

<template>
  <RichText
  :data-directus="setAttr({collection: 'block_gallery', item: id, fields: 'tagline, headline', mode: 'drawer' })"
	:id="id"
	:tagline="tagline"
	:headline="headline"
	:content="''"
	alignment="center"
  />
  <UCarousel
    :data-directus="setAttr({collection: 'block_gallery', item: id, fields: 'items', mode: 'popover' })"
    v-slot="{ item }"
    loop
    dots
    :autoplay="{ delay: 3000 }"
    :items="items"
    :ui="{ item: 'basis-1/4' }"
	  class="w-full mx-auto -mt-36"
  >
    <img :src="'/directus/assets/' + item.directus_file" width="234" height="234" class="rounded-lg">
  </UCarousel>
</template>