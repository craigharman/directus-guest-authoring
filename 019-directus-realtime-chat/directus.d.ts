/// <reference types="@directus/extensions/api.d.ts" />
interface DirectusSchema {
	messages: Message[];
}
interface Message {
	id: number;
	content: string;
	user_created: {
		id: number;
		email: string;
		first_name: string;
		last_name: string;
		avatar: string;
	};
	date_created: string;
}
