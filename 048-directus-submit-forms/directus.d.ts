/// <reference types="@directus/extensions/api.d.ts" />
interface DirectusSchema {
	forms: Form;
	form_submissions: FormSubmission;
}
interface Form {
	id: string;
	sort: number | null;
	title: string;
	is_active: boolean;
	submit_label: string;
	on_success: string;
	success_message: string;
	success_redirect_url: string | null;
	fields: FormField[];
}

interface FormField {
	id: string;
	name: string;
	type: string;
	label: string;
	placeholder: string | undefined;
	help: string | null;
	validation: string | null;
	width: string;
	choices: any | null;
	form: string;
	sort: number;
	required: boolean;
}
interface FormSubmission {
	form: string;
	values: FormSubmissionItem[]
}

interface FormSubmissionItem {
	field: string;
	value: string;
}