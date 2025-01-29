/// <reference types="@directus/extensions/api.d.ts" />

interface DirectusSchema {
	posts: Post[];
}

interface Post {
	id: number;
	title: string;
	content: string;
	user_created: string;
}
