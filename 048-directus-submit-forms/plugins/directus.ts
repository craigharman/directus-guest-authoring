import {
	createDirectus,
	rest,
	readItem,
	readItems,
	withToken,
	authentication,
} from "@directus/sdk";
const directus = createDirectus<DirectusSchema>(
	"http://localhost:3000/directus",
).with(authentication("session", { credentials: "include" }))
.with(rest({ credentials: "include" }));
export default defineNuxtPlugin(() => {
	return {
		provide: { directus, readItem, readItems, withToken },
	};
});
