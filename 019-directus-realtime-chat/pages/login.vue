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
		</div>
	</div>
</template>