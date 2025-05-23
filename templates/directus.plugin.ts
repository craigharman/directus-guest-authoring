import {
	createDirectus,
	readItem,
	readItems,
	rest,
	withToken,
} from "@directus/sdk";
const directus = createDirectus<DirectusSchema>(
	"http://localhost:3000/directus",
).with(rest());
export default defineNuxtPlugin(() => {
	return {
		provide: { directus, readItem, readItems, withToken },
	};
});
