// src/routes/admin/auth/login/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	const session = await locals.auth();

	if (session?.user) {
		const callbackUrl = url.searchParams.get('callbackUrl');
		const target = callbackUrl && callbackUrl.startsWith('/') ? callbackUrl : '/admin/dashboard';

		throw redirect(303, target);
	}

	return { session };
};
