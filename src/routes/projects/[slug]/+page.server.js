export const load = async ({ params }) => {
	// const post = await getPostFromDatabase(params.slug);

	return { params: params.slug };

	// error(404, 'Not found');
};
