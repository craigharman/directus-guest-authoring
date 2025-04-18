/// <reference types="@directus/extensions/api.d.ts" />
interface DirectusSchema {
	pages: Page[];
}
interface Page {
	id: number;
	title: string;
	permalink: string;
	status: string;
	published_at: string;
	seo: SEOMeta;
	blocks: Block[];
}

interface Block {
	id: string;
	collection: string;
	item: Hero | RichText;
	no_index: boolean;
	no_follow: boolean;
}

interface Hero {
	tagline: string;
	headline: string;
	description: string;
	button_group: ButtonGroup;
	image: Image;
}

interface ButtonGroup {
	buttons: Button[];
}

interface Button {
	label: string;
	url: string;
	variant: ButtonProps['variant'];
}

interface Image {
	id: number;
	title: string;
}

interface RichText {
	tagline: string;
	headline: string;
	content: string;
	alignment: string;
	hide_block: boolean;
}

interface SEOMeta {
	title: string;
	meta_description: string;
}
