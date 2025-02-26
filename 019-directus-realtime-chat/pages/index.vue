<script setup lang="ts">

const { $directus } = useNuxtApp()

const authToken: Ref<string | undefined> = ref()

onMounted(() => {
	$directus.onWebSocket('open', () => {
		console.log('Connection is open')
	})

	$directus.onWebSocket('message', (event) => {
		if (event.type === 'auth' && event.status === 'ok') {
			authToken.value = event.refresh_token
			subscribe()
		}
		console.log('Message received:', event)
	})
})

const login = async () => {
	await $directus.connect()
	const login = {
		type: 'auth',
		email: 'test@test.com',
		password: 'password'
	}
	$directus.sendMessage(JSON.stringify(login))
}

async function subscribe() {
	const { subscription } = await $directus.subscribe('messages', {
		event: 'create',
		query: {
			fields: ['*', 'user_created.first_name'],
		},
	})

	for await (const item of subscription) {
		console.log(item)
	}
}
</script>
<template>
	<div>
		<h1>Directus Realtime Chat</h1>
		<button @click="login">Login</button>
	</div>
</template>