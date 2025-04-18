<script setup lang="ts">

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
	:id="id"
	:tagline="tagline"
	:headline="headline"
	:content="''"
	alignment="center"
  />
  <UCarousel
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