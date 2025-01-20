export default defineNuxtRouteMiddleware(async (to, from) => {
	const { $isAuthenticated, $directus } = useNuxtApp();

	// Login and register pages are not protected
	if (to.path.startsWith("/login") || to.path.startsWith("/register")) {
		return;
	}

	const authenticated = await $isAuthenticated();

	if (!authenticated) {
		return navigateTo("/login");
	}

	return;
});
