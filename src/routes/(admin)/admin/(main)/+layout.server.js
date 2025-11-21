// src/routes/admin/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	const session = await locals.auth();

	// Allow access to the login page itself
	if (url.pathname.startsWith('/admin/auth/login')) {
		return { session };
	}

	// Everything else in /admin requires login
	if (!session?.user) {
		// Save where they were trying to go
		const redirectTo = encodeURIComponent(url.pathname + url.search);
		throw redirect(307, `/admin/auth/login?callbackUrl=${redirectTo}`);
	}

	return { session };
};
