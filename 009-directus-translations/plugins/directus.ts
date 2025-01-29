import {
	createDirectus,
	rest,
	readItems,
	readTranslation,
} from "@directus/sdk";
const directus = createDirectus<DirectusSchema>(
	"http://localhost:3000/directus",
).with(rest());
export default defineNuxtPlugin(() => {
	return {
		provide: { directus, readItems, readTranslation },
	};
});
