export const GET = async ({ request }) => {
	

	return new Response(JSON.stringify({ samples: samples }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
