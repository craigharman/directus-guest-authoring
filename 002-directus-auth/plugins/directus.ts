import { createDirectus, rest, registerUser } from "@directus/sdk";

const directus = createDirectus("http://localhost:3000/directus").with(rest());

export default defineNuxtPlugin(() => {
	return {
		provide: { directus, registerUser },
	};
});
