/// <reference types="@directus/extensions/api.d.ts" />
interface DirectusSchema {
	posts: Post[];
}

interface Post {
	id: string;
	title: string;
	slug: string;
	image: Image;
	description: string;
	author: string;
	published_at: string;
	sort?: number;
	content?: string;
	seo?: SEOMeta;
}

interface Image {
	id: string;
	filename_disk: string;
	title: string;
}

interface SEOMeta {
	title: string;
	meta_description: string;
}