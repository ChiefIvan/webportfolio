import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	// const post = await getPostFromDatabase(params.slug);

	if (params.slug == 'post1' || params.slug == 'post2') return { params: params.slug };

	error(404, `${params.slug} not found!`);
};
