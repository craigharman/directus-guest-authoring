<script setup lang="ts">
const { $directus, $registerUser } = useNuxtApp()

const email = ref('')
const password = ref('')
const result = ref(false)

const register = async () => {
	try {
		await $directus.request($registerUser(email.value, password.value))
		result.value = true
		password.value = ''
	} catch (error) {
		console.error(error)
		result.value = false
		password.value = ''
	}
}
</script>
<template>
	<form @submit.prevent="register">
		<h1>Register</h1>
		<div v-if="result">
			<p>Successfully registered</p>
		</div>
		<div>
			<input required type="text" v-model="email" name="email" placeholder="Email" />
		</div>
		<div>
			<input required type="password" v-model="password" name="password" placeholder="Password" />
		</div>
		<button type="submit">Register</button>
	</form>
</template>
