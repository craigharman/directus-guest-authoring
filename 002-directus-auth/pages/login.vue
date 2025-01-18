<script setup lang="ts">
const { $directus, $login } = useNuxtApp()

const email = ref('')
const password = ref('')
const result = ref(false)

const login = async () => {
	const response = await $directus.login(email.value, password.value)
	localStorage.setItem('directus_auth', JSON.stringify(response))
	result.value = true
}
</script>
<template>
	<form @submit.prevent="login">
		<h1>Login</h1>
		<div v-if="result">
			<p>Successfully logged in</p>
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