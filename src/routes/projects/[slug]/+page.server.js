import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	// const post = await getPostFromDatabase(params.slug);

	if (params.slug == 'docutracker' || params.slug == 'eventsync') return { params: params.slug };

	error(404, 'Project not found!');
};
