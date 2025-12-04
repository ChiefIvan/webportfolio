// src/routes/admin/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	const session = await locals.auth();

	if (!session?.user?.isAdmin) {
		const redirectTo = url.pathname.startsWith('/admin/auth/login')
			? '/admin/dashboard'
			: encodeURIComponent(url.pathname + url.search);

		throw redirect(307, `/admin/auth/login?callbackUrl=${redirectTo}`);
	}

	return { session };
};
