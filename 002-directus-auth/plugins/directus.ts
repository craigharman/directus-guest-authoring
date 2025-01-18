import {
	createDirectus,
	rest,
	registerUser,
	authentication,
} from "@directus/sdk";

const directus = createDirectus<DirectusSchema>(
	"http://localhost:3000/directus",
)
	.with(authentication("json"))
	.with(rest());

export default defineNuxtPlugin(() => {
	return {
		provide: { directus, registerUser },
	};
});
