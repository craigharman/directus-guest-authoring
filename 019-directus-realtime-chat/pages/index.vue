<script setup lang="ts">

const { $directus } = useNuxtApp()

const refreshToken: Ref<string | undefined> = ref()
const messageList: Ref<Message[]> = ref([])
const newMessage: Ref<string> = ref('')

const saveRefreshToken = (token: string) => {
	refreshToken.value = token
	localStorage.setItem('directus_refresh_token', token)
}

onMounted(() => {
	const storedToken = localStorage.getItem('directus_refresh_token')
	if (storedToken) {
		refreshToken.value = storedToken
		$directus.connect()
		$directus.onWebSocket('open', () => {
			$directus.sendMessage({
				type: 'auth',
				refresh_token: storedToken
			})
		})
	} else {
		$directus.connect()
	}

	$directus.onWebSocket('close', () => {
		console.log('Connection closed, attempting to reconnect...')
		if (refreshToken.value) {
			setTimeout(() => {
				$directus.connect()
				$directus.sendMessage({
					type: 'auth',
					refresh_token: refreshToken.value
				})
			}, 2000)
		}
	})

	const cleanup = $directus.onWebSocket('message', (message) => {
		console.log("CLEANUP")
		if (message.type === 'auth' && message.status === 'ok') {
			saveRefreshToken(message.refresh_token)
			readAllMessages()
			subscribe('create')
		}

		// The only message of type items we want to process is the initial array of messages
		// All other messages are handled by the subscription
		if (message.type === 'items' && Array.isArray(message.data)) {
			console.log("DATA from items", message)
			for (const item of message.data) {
				messageList.value.unshift(item)
			}
		}
		console.log(message)
	})

	onBeforeUnmount(cleanup)
})

const addMessageToList = (message: Message) => {
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
	console.log('receiveMessage', data)
	if (data.type === 'ping') {
		$directus.sendMessage({
			type: 'pong',
		})
	}
	if (data.type === 'subscription' && data.event === 'init') {
		console.log('subscription started')
	}
	if (data.type === 'subscription' && data.event === 'create') {
		const message = data.data[0]
		addMessageToList(message)
	}
}

const messageSubmit = () => {
	$directus.sendMessage({
		type: 'items',
		collection: 'messages',
		action: 'create',
		data: { content: newMessage.value },
	})

	newMessage.value = ''
}
</script>

<template>
	<div>
		<h1>Directus Realtime Chat</h1>
		<div v-if="refreshToken === undefined">
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
			<form @submit.prevent="messageSubmit">
				<label for="message">Message</label>
				<input v-model="newMessage" type="text" id="text" />
				<input type="submit" />
			</form>
		</div>
	</div>
</template>

<style>
form {
	margin-top: 2em;
}
</style>