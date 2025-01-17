import {
	createDirectus,
	rest,
	readItem,
	readItems,
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
