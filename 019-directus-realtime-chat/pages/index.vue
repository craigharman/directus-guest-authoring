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

const credentials = ref({
	email: '',
	password: ''
})

const login = async () => {
	try {
		await $directus.connect()
	} catch (error) {
		console.error(error) // Continue if socket is already connected
	}
	const login = {
		type: 'auth',
		email: credentials.value.email,
		password: credentials.value.password
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
		<div v-if="authToken === undefined">
			<h2>Login</h2>
			<input v-model="credentials.email" type="text" placeholder="Email" /><br />
			<input v-model="credentials.password" type="password" placeholder="Password" /><br />
			<button @click="login" type="button">Login</button>
		</div>
		<div v-else>
			<h2>Chat</h2>
			<div>Logged in</div>
		</div>
	</div>
</template>