<script setup lang="ts">

const { $directus } = useNuxtApp()

const authToken: Ref<string | undefined> = ref()
const messageList: Ref<Message[]> = ref([])

onMounted(() => {
	$directus.onWebSocket('open', () => {
		console.log('Connection is open')
	})

	const cleanup = $directus.onWebSocket('message', (data) => {
		if (data.type === 'auth' && data.status === 'ok') {
			authToken.value = data.refresh_token
			readAllMessages()
			subscribe('create')
		}

		if (data.type === 'items') {
			for (const item of data.data) {
				// Add to the beginning of the list to get order correct
				messageList.value.unshift(item)
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

const credentials = ref({
	email: '',
	password: ''
})

const login = async () => {
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
		uid: "messages-subscription"
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