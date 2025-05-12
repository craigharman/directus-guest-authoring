<script lang="ts" setup>
import { setAttr } from '@directus/visual-editing'

const props = defineProps<{
	id: string
	tagline: string
	headline: string
	pricing_cards: PricingCard[]
}>()
</script>

<template>
	<RichText
		:data-directus="setAttr({collection: 'block_pricing', item: id, fields: 'tagline, headline', mode: 'drawer' })"
		:id="id"
		:tagline="tagline"
		:headline="headline"
		:content="''"
		alignment="center"
	/>
	<div class="-mt-36" :data-directus="setAttr({collection: 'block_pricing', item: id, fields: 'pricing_cards', mode: 'drawer' })">
		<UPricingPlans>
			<UPricingPlan
			v-for="(plan, index) in pricing_cards"
			:key="index"
			:title="plan.title"
			:description="plan.description"
			:features="plan.features"
			:price="plan.price"
			:highlight="plan.is_highlighted"
			/>
		</UPricingPlans>
	</div>
</template>