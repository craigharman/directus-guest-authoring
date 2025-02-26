import { createDirectus, realtime } from "@directus/sdk";
const directus = createDirectus<DirectusSchema>(
	"http://localhost:8055/directus",
).with(realtime());
export default defineNuxtPlugin(() => {
	return {
		provide: { directus },
	};
});
