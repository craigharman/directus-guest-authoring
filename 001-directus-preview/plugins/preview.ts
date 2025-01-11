export default defineNuxtPlugin((nuxtApp) => {
    const route = useRoute();
    const isPreview = route.query.preview && route.query.preview === 'true';
    const hasToken = route.query.auth_token
    const version = route.query.version || 'main'

    if (isPreview) {
        if (!hasToken) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Not authenticated'
            })
        }
        nuxtApp.hook('page:finish', () => {
            refreshNuxtData();
        });
    }

    return { provide: { isPreview, previewToken: route.query.auth_token, previewVersion: version } };
});