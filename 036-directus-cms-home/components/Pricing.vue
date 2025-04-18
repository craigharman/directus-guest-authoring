<script lang="ts" setup>

const props = defineProps<{
	id: string
	tagline: string
	headline: string
	pricing_cards: PricingCard[]
}>()
</script>

<template>
	<RichText
		:id="id"
		:tagline="tagline"
		:headline="headline"
		:content="''"
		alignment="center"
	/>
	<UPricingPlans class="-mt-36">
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
</template>