import {
	createDirectus,
	rest,
	readFieldsByCollection,
	createItem,
} from "@directus/sdk";
const directus = createDirectus<DirectusSchema>(
	"http://localhost:3000/directus",
).with(rest());
export default defineNuxtPlugin(() => {
	return {
		provide: { directus, readFieldsByCollection, createItem },
	};
});
