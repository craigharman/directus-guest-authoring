<script setup lang="ts">
const { $directus } = useNuxtApp()
const router = useRouter()

const email = ref('')
const password = ref('')
const result = ref(false)
const errorMsg = ref(null)

const login = async () => {
	try {
		errorMsg.value = null
		const response = await $directus.login(email.value, password.value)
		result.value = true
		router.push('/posts') // Redirect to /posts
	} catch (error) {
		errorMsg.value = error.message || 'An unexpected error occurred'
	}
}
</script>
<template>
	<form @submit.prevent="login">
		<h1>Login</h1>
		<div v-if="result">
			<p>Successfully logged in</p>
		</div>
		<div v-if="errorMsg">
			<p>{{ errorMsg }}</p>
		</div>
		<div>
			<input required type="text" v-model="email" name="email" placeholder="Email" />
		</div>
		<div>
			<input required type="password" v-model="password" name="password" placeholder="Password" />
		</div>
		<button type="submit">Login</button>
	</form>
</template>