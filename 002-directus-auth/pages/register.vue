<script setup>
const { $directus, $registerUser } = useNuxtApp()

const email = ref('')
const password = ref('')

const result = async () => await $directus.request($registerUser(email, password))
</script>
<form @submit.prevent="register">
	<h1>Register</h1>
	<input type="text" v-model="email" name="email" placeholder="Email" />
	<input type="password" v-model="password" name="password" placeholder="Password" />
	<button type="submit">Register</button>
</form>