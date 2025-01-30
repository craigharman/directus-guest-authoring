/// <reference types="@directus/extensions/api.d.ts" />

interface DirectusSchema {
	pages: Page[];
}

interface Block {
	id: string;
	collection: string;
	item: Hero | RichText | CardGroup;
}

interface Page {
	title: string;
	slug: string;
	blocks: Block[];
}

interface Button {
	label: string;
	href: string;
	variant: string;
}

interface Card {
	id: number;
	image: string;
	content: string;
}

interface Post {
	id: number;
	title: string;
	content: string;
}

interface Hero {
	headline: string;
	content: string;
	buttons: Button[];
}

interface RichText {
	headline: string;
	content: string;
}

interface CardGroup {
	headline: string;
	content: string;
	group_type: string;
	posts: Post[];
	cards: Card[];
}

interface Card {
	image: string;
	content: string;
}