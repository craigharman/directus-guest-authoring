<script setup lang="ts">

const { $directus } = useNuxtApp()

const refreshToken: Ref<string | undefined> = ref()
const credentials = ref({
	email: '',
	password: ''
})

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


	const cleanup = $directus.onWebSocket('message', (message) => {
		if (message.type === 'auth' && message.status === 'ok') {
			saveRefreshToken(message.refresh_token)
			if (messageList.value.length === 0) {
				readAllMessages()
				subscribe('create')
			}
		}

		// The only message of type items we want to process is the initial array of messages
		// All other messages are handled by the subscription
		if (message.uid === 'get-recent-messages' && message.type === 'items') {
			for (const item of message.data) {
				messageList.value.unshift(item)
			}
		}
	})

	onBeforeUnmount(cleanup)
})

const login = async () => {
	const login = {
		type: 'auth',
		email: credentials.value.email,
		password: credentials.value.password
	}
	$directus.sendMessage(JSON.stringify(login))
}

const messageList: Ref<Message[]> = ref([])

const subscribe = async (event) => {
	const { subscription } = await $directus.subscribe('messages', {
		event,
		query: {
			fields: ['*', 'user_created.first_name'],
		},
		uid: "new-message-created"
	})

	for await (const message of subscription) {
		receiveMessage(message)
	}
}

const receiveMessage = (data) => {
	if (data.type === 'ping') {
		$directus.sendMessage({
			type: 'pong',
		})
	}
	if (data.uid === 'new-message-created' && data.type === 'subscription' && data.event === 'create') {
		const message = data.data[0]
		addMessageToList(message)
	}
}

const addMessageToList = (message: Message) => {
	messageList.value.push(message)
}
const newMessage: Ref<string> = ref('')
const messageSubmit = () => {
	$directus.sendMessage({
		type: 'items',
		collection: 'messages',
		action: 'create',
		data: { content: newMessage.value },
	})

	newMessage.value = ''
}

const logout = () => {
	$directus.sendMessage({
		type: 'auth',
		action: 'logout',
	})
	refreshToken.value = undefined
	localStorage.removeItem('directus_refresh_token')
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
		uid: 'get-recent-messages'
	})
}

$directus.onWebSocket('close', () => {
	if (refreshToken.value) {
		$directus.connect()
		$directus.sendMessage({
			type: 'auth',
			refresh_token: refreshToken.value
		})
	}
})
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
			<div v-for="message in messageList" :key="message.id">
				{{ message.user_created.first_name }}: {{ message.content }}
			</div>
			<form @submit.prevent="messageSubmit">
				<label for="message">Message</label>
				<input v-model="newMessage" type="text" id="text" />
				<input type="submit" />
			</form>
			<button type="button" @click="logout">Logout</button>
		</div>
	</div>
</template>