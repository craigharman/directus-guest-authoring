/// <reference types="@directus/extensions/api.d.ts" />
interface DirectusSchema {
	posts: Post[];
	posts_translations: PostTranslation[];
}
interface Post {
	id: number;
	title: string;
	content: string;
	slug?: string;
}

interface PostTranslation {
	id: number;
	title: string;
	content: string;
	languages_code: string;
	posts_id: number;
}
