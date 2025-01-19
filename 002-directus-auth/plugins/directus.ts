import {
	createDirectus,
	rest,
	readItems,
	registerUser,
	authentication,
	readMe,
} from "@directus/sdk";

const directus = createDirectus<DirectusSchema>(
	"http://localhost:3000/directus",
)
	// .with(authentication("session"))
	// .with(rest());
	.with(authentication("cookie", { credentials: "include" }))
	.with(rest({ credentials: "include" }));

const isAuthenticated = async () => {
	try {
		return await directus.request(
			readMe({
				fields: ["id", "email"],
			}),
		);
	} catch (error) {
		console.error(error);
		return false;
	}
};

export default defineNuxtPlugin(() => {
	return {
		provide: { directus, readItems, registerUser, isAuthenticated },
	};
});
