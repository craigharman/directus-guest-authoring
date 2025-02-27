<script setup lang="ts">
import type { SubscriptionOptionsEvents, WebSocketEvents } from '@directus/sdk'


const { $directus } = useNuxtApp()

const authToken: Ref<string | undefined> = ref()
const messageList: Ref<Message[]> = ref([])

onMounted(() => {
	const cleanup = $directus.onWebSocket('message', (data) => {
		if (data.type === 'auth' && data.status === 'ok') {
			authToken.value = data.refresh_token
			readAllMessages()
			subscribe('create')
		}

		if (data.type === 'items') {
			for (const item of data.data) {
				addMessageToList(item)
			}
		}
		console.log(data)
	})

	$directus.connect()
	onBeforeUnmount(cleanup)
})

const addMessageToList = (message) => {
	messageList.value.push(message)
}

const readAllMessages = () => {
	$directus.sendMessage({
		type: 'items',
		collection: 'messages',
		action: 'read',
		query: {
			limit: 10,
			sort: '-date_created',
			fields: ['*', 'user_created.first_name'],
		},
	})
}

// onMounted(() => {
// 	$directus.onWebSocket('open', () => {
// 		console.log('Connection is open')
// 	})

// 	$directus.onWebSocket('message', (event) => {
// 		if (event.type === 'auth' && event.status === 'ok') {
// 			authToken.value = event.refresh_token
// 			subscribe() // Subscribe to all events
// 		}
// 		console.log('Message received:', event)
// 	})
// })

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

const subscribe = async (event) => {
	const { subscription } = await $directus.subscribe('messages', {
		event,
		query: {
			fields: ['*', 'user_created.first_name'],
		},
	})

	for await (const message of subscription) {
		console.log('receiveMessage', message)
		receiveMessage(message)
	}
}

const receiveMessage = (data) => {
	if (data.type === 'subscription' && data.event === 'init') {
		console.log('subscription started')
	}
	if (data.type === 'subscription' && data.event === 'create') {
		const message = data.data[0]
		addMessageToList(message)
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
			<div v-for="message in messageList" :key="message.id">
				{{ message.user_created.first_name }}: {{ message.content }}
			</div>
		</div>
	</div>
</template>