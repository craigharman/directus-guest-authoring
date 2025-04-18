// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: false },
	modules: ['@nuxt/ui-pro'],
	css: ['~/assets/css/main.css'],
	routeRules: {
		"/directus/**": { proxy: `${import.meta.env.API_URL}/**` },
	},
});
