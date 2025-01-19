export default defineNuxtRouteMiddleware(async (to, from) => {
	const { $isAuthenticated, $directus } = useNuxtApp();

	// If redirecting to an error, no authentication is required
	if (useError()) return;

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
