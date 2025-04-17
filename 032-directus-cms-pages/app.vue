<script lang="ts" setup>
import {ref, type Ref} from 'vue'

const links: Ref<Link[]> = ref([])

type Link = {
	text: string
	href: string
}

const addLink = (text: string, href: string) => {
	links.value.push({ text, href })
}

const reset = () => {
	links.value = [{
		text: 'Posts',
		href: '/',
	}]
}

const updateLink = (link: Link) => {
  if (link) {
    addLink(link.text, link.href)
  } else {
    reset()
  }
}

reset()
</script>

<template>
  <div>
    <h1>Directus Blog</h1>
    <Breadcrumb :breadcrumbs="links"/>
    <NuxtRouteAnnouncer />
    <NuxtPage @navigated="(link: Link) => updateLink(link)" />
  </div>
</template>
